'use strict';

const methodOverride  = require('method-override'),
  cookieSession   = require('cookie-session'),
  errorHandler    = require('error-handler'),
  cookieParser    = require('cookie-parser'),
  bodyParser      = require('body-parser'),
  mongoose        = require('mongoose'),
  config          = require('./config'),
  bcrypt          = require('bcryptjs'),
  express         = require('express'),
  path            = require('path'),
  csrf            = require('csurf'),
  fs              = require('fs');

var port = process.env.PORT || config.port;
var app = express();
var application_root  = __dirname;

app.enable('trust proxy'); // Allow node to be run with proxy passing

app.use(bodyParser.json());
app.use(methodOverride());

app.use(bodyParser.urlencoded({ extended: true })); // Needed to parse POST data sent as JSON payload
// app.use(express.compress()); // Compression (gzip)

// Cookie config
app.use(cookieParser( config.cookieSecret )); // populates req.signedCookies
app.use(cookieSession( {keys: config.sessionSecret} )); // populates req.session, needed for CSRF

var csrfProtection = csrf({ cookie: true });

// We need serverside view templating to initially set the CSRF token in the <head> metadata
// Otherwise, the html could just be served statically from the public directory
app.set('view engine', 'html');
app.set('views', __dirname + '/views' );
app.engine('html', require('hbs').__express);

app.use(express.static(application_root + '/../public'));


mongoose.connect( 'mongodb://localhost/myapp' );

// @see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

var StickerModel  = require('./api/models/sticker'),
    UserModel     = require('./api/models/user');

// Close the db connection on process exit (should already happen, but to be safe)
process.on('exit', function(){
    mongoose.disconnect();
});


app.listen(port, console.log('Server is running on port', port));





function getCurrentUser(options, onSuccess, onError) {

  onSuccess = onSuccess || function(){};
  onError = onError || function(){};

  let filter = {
    _id: options.signedCookies.user_id,
    auth_token: options.signedCookies.auth_token
  };

  UserModel.findOne(filter, (err, user) => {
    if (!err && user) {
      //console.log('current user:' + JSON.stringify(user));
      onSuccess(user);  
    } else {
      onError();
    }
  });
}




// routes

app.get('/', csrfProtection, function(req, res) {
  res.render('index', { csrfToken: req.csrfToken() }); // pass the csrfToken to the view
});

// GET /api/auth
// @desc: checks a user's auth status based on cookie
app.get('/api/auth', function(req, res) {

  let filter = {
    _id: req.signedCookies.user_id,
    auth_token: req.signedCookies.auth_token
  };

  // console.log(req.signedCookies); // debug

  return UserModel.findOne(filter, (err, user) => {

    if (!err) {
      if (user) {

        // @todo realize role system. Now only like that
        // if username equals 'admin', then return 'is_admin' property

        let is_admin = (user.username === 'admin');

        //warning: omit don't work with mongoose
        //@see http://stackoverflow.com/questions/17980461
        //user = _.omit(user, ['password', 'auth_token']);
        
        res.json({ 
          user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            is_admin: is_admin
          }
        });   
      } else {  
        res.json({error: 'Client has no valid login cookies.'});
      }
    } else {
      console.log(err);
    }
  });
});

// POST /api/auth/login
// @desc: logs in a user
app.post('/api/auth/login', function(req, res) {

  let filter = {
    username: req.body.username
  };

  return UserModel.findOne( filter, ( err, user ) => {
    if(!err) {

      if (user) {

        // Compare the POSTed password with the encrypted db password
        if( bcrypt.compareSync( req.body.password, user.password)){

          let cookieParams = { signed: true, maxAge: config.cookieMaxAge };

          res.cookie('user_id', user.id, cookieParams);
          res.cookie('auth_token', user.auth_token, cookieParams);



          // Correct credentials, return the user object
          // all data, exept ['password', 'auth_token']
          res.json({ 
            user: {
              _id: user._id,
              username: user.username,
              name: user.name,
              is_admin: user.username === 'admin'
            }
          });

        } else {
          // Username did not match password given
          res.json({ error: 'Invalid username or password.'  });   
        }
      } else {
        // Could not find the username
        res.json({ error: 'Username does not exist.'  });   
      }

    } else {
      return console.log(err);
    }
  });
});

// POST /api/auth/signup
// @desc: creates a user
app.post('/api/auth/signup', function(req, res) {


  const saltRounds = 8;

  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var user = new UserModel({
    username: req.body.username,
    name: req.body.name,
    auth_token: salt,
    password: hash,
    admin: req.body.username === 'admin'
  });

  return user.save( function( err ) {
    if( !err ) {
      console.log('Register new user ' + req.body.username);

      let filter = {
        username: req.body.username
      };

      //Retrieve the inserted user data
      return UserModel.findOne( filter, function( err, user ) {
        if (!err) {

          if (user) {

            // Set the user cookies and return the cleansed user data
            res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
            res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });
            //res.json({ user: _.omit(user, ['password', 'auth_token']) });

            res.json({ 
              user: {
                _id: user._id,
                username: user.username,
                name: user.name,
                is_admin: user.admin
              }
            }); 

          } else {
            let message = 'Error while trying to register user: ';
            console.log(message + JSON.stringify(err));
            res.json({ error: message }); 
          }
        } else {
          return console.log(err);
        }
      });
    } else {
      console.log(err);
      res.json({ error: 'Username has been taken.', field: 'username' });       
    }
  });
});

// POST /api/auth/logout
// @desc: logs out a user, clearing the signed cookies
app.post('/api/auth/logout', function(req, res){
    res.clearCookie('user_id');
    res.clearCookie('auth_token');
    res.json({ success: 'User successfully logged out.' });
});

// POST /api/auth/remove_account
// @desc: deletes a user
app.post('/api/auth/remove_account', function(req, res){
  let filter = {
    _id: req.signedCookies.user_id,
    auth_token: req.signedCookies.auth_token
  };

  return UserModel.findOne( filter, function( err, user ) {
    if (user) {
      let username = user.username;
      return user.remove( function( err ) {
        if( !err ) {
          console.log('User removed:' + username);
          res.clearCookie('user_id');
          res.clearCookie('auth_token');
          res.json({ success: 'User successfully deleted.' });
        } else {
          console.log(err);
          res.json({ error: 'Error while trying to delete user.' }); 
        }
      });
    }
  });
});



app.get('/api/stickers', function(request, response) {
  return getCurrentUser( request, (user) => {
    return StickerModel.find( function( err, stickers ) {
      if( !err ) {
        return response.send( stickers );
      } else {
        return console.log( err );
      }
    });
  }, () => response.sendStatus(403));
});


app.get( '/api/stickers/:id', function( request, response ) {
  return getCurrentUser( request, (user) => {  
    return StickerModel.findById( request.params.id, function( err, sticker ) {
      if( !err ) {
        return response.send( sticker );
      } else {
        return console.log( err );
      }
    });
  }, () => response.sendStatus(403));   
});

app.post( '/api/stickers', function( request, response ) {
  return getCurrentUser( request, (user) => {
    if (user.admin) {
      var sticker = new StickerModel({
        title: request.body.title,
        description: request.body.description,
        user_id: user._id,
        created: request.body.created,
        likes: []
      });

      sticker.save( function( err ) {
        if( !err ) {
          return console.log('Created new sticker.');
        } else {
          return console.log( err );
        }
      });
      return response.send(sticker);
    } else {
      return response.status(403).send('Forbidden');
    }
  }, () => response.status(400).send('Bad Request')
  );
});

app.put( '/api/stickers/:id', function( request, response ) {
  console.log('Updating sticker: ' + request.params.id);
  return getCurrentUser( request, (user) => { 

    return StickerModel.findById( request.params.id, function( err, sticker ) {

      const user_id = user._id;

      if (request.body.like) {

        // liked or not by current user
        var index = -1;
        sticker.likes.forEach((item, i) => {
          if (item.user_id == user_id) {
            index = i;
          }
        });

        //~index && sticker.likes.splice(index, 1);

        if (~index) {
          sticker.likes.splice(index, 1);
        } else {
          sticker.likes.push({
            user_id: user_id
          });          
        }
      }

      if (user.admin) {
        sticker.title = request.body.title;
        sticker.description = request.body.description;
        // sticker.user_id = request.body.user_id;
        // sticker.created = request.body.created;
      }

      //console.log(sticker.likes);

      return sticker.save( function( err ) {
        if( !err ) {
          console.log('Sticker updated');
        } else {
          console.log(err);
        }
        return response.send(sticker);
      });
    });    
  }, () => response.sendStatus(403));
});


app.delete( '/api/stickers/:id', function( request, response ) {
  console.log( 'Deleting sticker with id: ' + request.params.id );
  return getCurrentUser( request, (user) => { 
    if (user.admin) {  
      return StickerModel.findById( request.params.id, function( err, sticker ) {
        return sticker.remove( function( err ) {
          if( !err ) {
            console.log('Sticker removed');
            return response.send({});
          } else {
            console.log(err);  
            return response.sendStatus(400);
          }
        });
      });
    } else {
      return response.sendStatus(403);
    }
  }, () => response.sendStatus(403));
});



