/*jshint esnext:true */

import BookView from './book';
import Book from './../models/book';
import Library from './../collections/library';

const { View } = Backbone;

export default class LibraryView extends View {
  constructor(options) {
    super(options);
  }

  get el() {
    return '#books';
  }

  get events() {
    return {
      'click #add':'addBook'
    };
  }

  initialize(initialBooks) {

    this.collection = new Library();
    this.collection.fetch({reset: true});

    this.render();

    this.listenTo( this.collection, 'add', this.renderBook );
    this.listenTo( this.collection, 'reset', this.render );
  }

  render() {
    this.collection.each( item => this.renderBook( item ) );
    return this;
  }

  // отображение библиотеки посредством вывода каждой книги из коллекции
  renderBook(item) {
    var bookView = new BookView({
      model: item
    });

    this.$el.append( bookView.render().el );
  }

  addBook(e) {
    e.preventDefault();
    var formData = {};

    $('#addBook div').children('input').each( (i, el) => {
      if ($(el).val() != ''){

        if( el.id === 'keywords' ) {
          formData[el.id] = [];
          _.each($(el).val().split(' '), function( keyword ) {
            formData[el.id].push({'keyword': keyword});
          });
        } else if(el.id === 'releaseDate') {
          formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
        } else {
          formData[el.id] = $(el).val();
        }

        $(el).val('');
      }
    });

    //this.collection.add( new Book(formData) );
    this.collection.create( formData );
  }






}