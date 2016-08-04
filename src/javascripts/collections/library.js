import Book  from './../models/book';

const { Collection, LocalStorage } = Backbone;

export default class Library extends Collection {

  constructor(options) {
    super(options);

    // Hold a reference to this collection's model.
    this.model = Book;
    
    this.url = '/api/books';

    // Save all of the todo items under the `'todos'` namespace.
    //this.localStorage = new LocalStorage('backbone-todomvc-es6');
  }
}