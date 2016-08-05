const bodyParser      = require('body-parser'),
      express         = require('express'),
      fs              = require('fs'),
      path            = require('path'),
      mongoose        = require('mongoose'),
      methodOverride  = require('method-override'),
      errorHandler    = require('error-handler');

const app               = express(),
      port              = 4711,
      application_root  = __dirname;


app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(application_root + '/public'));

/*
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
*/

app.listen(port, console.log('Server is running on port', port));

mongoose.connect( 'mongodb://localhost/library_database' );

var Keywords = new mongoose.Schema({
  keyword: String
});

var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date,
  keywords: [ Keywords ]
});


var Votes = new mongoose.Schema({
  user_id: String
});

var Sticker = new mongoose.Schema({
  title: String,
  description: String,
  user_id: String,
  created: Date,
  likes: [ Votes ]
});


/**
 * @see http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;
var BookModel = mongoose.model( 'Book', Book );
var StickerModel = mongoose.model( 'Sticker', Sticker );

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

    //@todo current user id
    const user_id = 1;

    if (request.body.like) {
      if (request.body.liked) {
        sticker.likes.push({
          user_id: user_id
        });
      } else {


        var index = -1;
        sticker.likes.forEach(function(item, i) {
          if (item.user_id == user_id) {
            index = i;
          }
        });

        ~index && sticker.likes.splice(index, 1);
      }
    } 

    console.log(sticker.likes);

    //likes: []

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