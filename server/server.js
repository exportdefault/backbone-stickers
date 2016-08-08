"use strict";

const methodOverride  = require('method-override'),
  cookieSession   = require('cookie-session'),
  errorHandler    = require('error-handler'),
  cookieParser    = require('cookie-parser'),
  bodyParser      = require('body-parser'),
  _               = require("underscore"),
  mongoose        = require('mongoose'),
  config          = require("./config"),
  express         = require('express'),
  bcrypt          = require("bcrypt"),
  path            = require('path'),
  //csrf            = require('csrf'),
  fs              = require('fs');

var csrf = require('csurf');

var port = process.env.PORT || config.port;
var app = express();
var application_root  = __dirname;



// Allow node to be run with proxy passing
app.enable('trust proxy');



app.use(bodyParser.json());
app.use(methodOverride());

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
// var parseForm = bodyParser.urlencoded({ extended: false })

//app.use(express.compress()); // Compression (gzip)

// Needed to parse POST data sent as JSON payload

app.use(bodyParser.urlencoded({ 
  extended: true 
}));


// Cookie config
app.use( cookieParser( config.cookieSecret ) );    // populates req.signedCookies
app.use( cookieSession( {keys: config.sessionSecret} ) );  // populates req.session, needed for CSRF


// We need serverside view templating to initially set the CSRF token in the <head> metadata
// Otherwise, the html could just be served statically from the public directory
app.set('view engine', 'html');
app.set('views', __dirname + '/views' );
app.engine('html', require('hbs').__express);

app.use(express.static(application_root + '/../public'));
//app.use(csrf());


app.listen(port, console.log('Server is running on port', port));




//mongoose.connect( 'mongodb://localhost/library_database' );
mongoose.connect( 'mongodb://localhost/myapp' );

// @see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

var StickerModel  = require('./api/models/sticker'),
    UserModel     = require('./api/models/user');



app.get('/', csrfProtection, function(req, res) {
  // pass the csrfToken to the view
  res.render('index', { csrfToken: req.csrfToken() })
})

// GET /api/auth
// @desc: checks a user's auth status based on cookie
app.get('/api/auth', function(req, res) {

  let filter = {
    _id: req.signedCookies.user_id,
    auth_token: req.signedCookies.auth_token
  };

  console.log(req.signedCookies); // debug

  return UserModel.findOne(filter, (err, user) => {

    if (!err) {
      if (user) {

        //warning: omit don't work with mongoose
        //@see http://stackoverflow.com/questions/17980461
        //user = _.omit(user, ['password', 'auth_token']);
        
        res.json({ 
          user: {
            _id: user._id,
            username: user.username,
            name: user.name
          }
        });   
      } else {  
        res.json({error: "Client has no valid login cookies."});
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
              name: user.name
            }
          });

        } else {
          // Username did not match password given
          res.json({ error: "Invalid username or password."  });   
        }
      } else {
        // Could not find the username
        res.json({ error: "Username does not exist."  });   
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

  console.log(req.body.password);

  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var user = new UserModel({
    username: req.body.username,
    name: req.body.name,
    auth_token: salt,
    password: hash
  });

  return user.save( function( err ) {
    if( !err ) {
      console.log( 'created' );

      let filter = {
        username: req.body.username
      };

      //Retrieve the inserted user data
      return UserModel.findOne( filter, function( err, user ) {
        if (!err) {

          console.log(user);
          if (user) {

            // Set the user cookies and return the cleansed user data
            res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
            res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });
            //res.json({ user: _.omit(user, ['password', 'auth_token']) });

            res.json({ 
              user: {
                _id: user._id,
                username: user.username,
                name: user.name
              }
            }); 

          } else {
            console.log(err, rows);
            res.json({ error: "Error while trying to register user." }); 
          }
        } else {
          return console.log(err);
        }
      });
    } else {
      console.log( err );
      res.json({ error: "Username has been taken.", field: "username" });       
    }
  });
});

// POST /api/auth/logout
// @desc: logs out a user, clearing the signed cookies
app.post("/api/auth/logout", function(req, res){
    res.clearCookie('user_id');
    res.clearCookie('auth_token');
    res.json({ success: "User successfully logged out." });
});

// POST /api/auth/remove_account
// @desc: deletes a user
app.post("/api/auth/remove_account", function(req, res){
  let filter = {
    _id: req.signedCookies.user_id,
    auth_token: req.signedCookies.auth_token
  };

  return UserModel.findOne( filter, function( err, user ) {
    if (user) {
      return user.remove( function( err ) {
        if( !err ) {
          console.log( 'User removed' );
          res.clearCookie('user_id');
          res.clearCookie('auth_token');
          res.json({ success: "User successfully deleted." });
        } else {
          console.log( err );
          res.json({ error: "Error while trying to delete user." }); 
        }
      });
    }
  });

});



app.get('/api/stickers', function(request, response) {
  return StickerModel.find( function( err, stickers ) {
    if( !err ) {
      return response.send( stickers );
    } else {
      return console.log( err );
    }
  });
});


app.get( '/api/stickers/:id', function( request, response ) {
  return StickerModel.findById( request.params.id, function( err, sticker ) {
    if( !err ) {
      return response.send( sticker );
    } else {
      return console.log( err );
    }
  });
});

app.post( '/api/stickers', function( request, response ) {
  console.log(JSON.stringify(request.body));
  var sticker = new StickerModel({
    title: request.body.title,
    description: request.body.description,
    user_id: request.body.user_id,
    created: request.body.created,
    likes: []
  });

  sticker.save( function( err ) {
    if( !err ) {
      return console.log( 'created' );
    } else {
      return console.log( err );
    }
  });
  return response.send( sticker );
});

app.put( '/api/stickers/:id', function( request, response ) {
  console.log( 'Updating sticker ' + request.body.title );

  console.log(JSON.stringify(request.body));

  return StickerModel.findById( request.params.id, function( err, sticker ) {
    sticker.title = request.body.title;
    sticker.description = request.body.description;
    sticker.user_id = request.body.user_id;
    sticker.created = request.body.created;

    sticker.likes = sticker.likes;



    getCurrentUser( request, (user) => {

    const user_id = user._id;
    console.log('current user:' + JSON.stringify(user));

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

      console.log(sticker.likes);

      return sticker.save( function( err ) {
        if( !err ) {
          console.log( 'sticker updated' );
        } else {
          console.log( err );
        }
        return response.send( sticker );
      });

    });

    
  });
});


app.delete( '/api/stickers/:id', function( request, response ) {
  console.log( 'Deleting sticker with id: ' + request.params.id );
  return StickerModel.findById( request.params.id, function( err, sticker ) {
    return sticker.remove( function( err ) {
      if( !err ) {
        console.log( 'Sticker removed' );
        return response.send( '' );
      } else {
        console.log( err );
      }
    });
  });
});



function getCurrentUser(options, callback) {
  let filter = {
    _id: options.signedCookies.user_id,
    auth_token: options.signedCookies.auth_token
  };

  UserModel.findOne(filter, (err, user) => {
    if (!err && user) {
      callback(user);  
    }
  });
}






/*
app.get('/api/books', function(request, response) {
  return BookModel.find( function( err, books ) {
    if( !err ) {
      return response.send( books );
    } else {
      return console.log( err );
    }
  });
});


app.get( '/api/books/:id', function( request, response ) {
  return BookModel.findById( request.params.id, function( err, book ) {
    if( !err ) {
      return response.send( book );
    } else {
      return console.log( err );
    }
  });
});

app.post( '/api/books', function( request, response ) {
  console.log(JSON.stringify(request.body));
  var book = new BookModel({
    title: request.body.title,
    author: request.body.author,
    releaseDate: request.body.releaseDate,
    keywords: request.body.keywords 
  });

  book.save( function( err ) {
    if( !err ) {
      return console.log( 'created' );
    } else {
      return console.log( err );
    }
  });
  return response.send( book );
});



app.put( '/api/books/:id', function( request, response ) {
  console.log( 'Updating book ' + request.body.title );
  return BookModel.findById( request.params.id, function( err, book ) {
    book.title = request.body.title;
    book.author = request.body.author;
    book.releaseDate = request.body.releaseDate;
    book.keywords = request.body.keywords;

    return book.save( function( err ) {
      if( !err ) {
        console.log( 'book updated' );
      } else {
        console.log( err );
      }
      return response.send( book );
    });
  });
});


app.delete( '/api/books/:id', function( request, response ) {
  console.log( 'Deleting book with id: ' + request.params.id );
  return BookModel.findById( request.params.id, function( err, book ) {
    return book.remove( function( err ) {
      if( !err ) {
        console.log( 'Book removed' );
        return response.send( '' );
      } else {
        console.log( err );
      }
    });
  });
});
*/


// Close the db connection on process exit 
// (should already happen, but to be safe)
process.on("exit", function(){
    mongoose.disconnect();
});