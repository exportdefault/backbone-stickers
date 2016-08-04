const bodyParser      = require('body-parser'),
      express         = require('express'),
      fs              = require('fs'),
      path            = require('path'),
      mongoose        = require('mongoose'),
      methodOverride  = require('method-override'),
      errorHandler    = require('error-handler');


const app   = express(),
      port  = 4711,
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
//app.listen(port, console.log( 'Express server listening on port %d in %s mode', port, app.settings.env ));


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

/**
 * @see http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;
var BookModel = mongoose.model( 'Book', Book );

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