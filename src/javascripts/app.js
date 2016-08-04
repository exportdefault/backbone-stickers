/*jshint esnext:true */

import Library      from './collections/library';
import LibraryView  from './views/library';
import Book         from './models/book';

class Application {
  constructor () {
    this.init();
  }

  init() {

    $('#releaseDate').datepicker();
    new LibraryView(); 
  }
}

// Load the application once the DOM is ready, using `jQuery.ready`
$(() => {
  new Application();
});

import './../stylesheets/base';