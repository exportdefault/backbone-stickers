/*jshint esnext:true */

import { template } from './../templates/book';
//import Cache from './../helpers/cache';

const { View } = Backbone;

// BookView class
export default class BookView extends View {
 
  get tagName() {
    return 'div';
  }  

  get className() {
    return 'bookContainer';
  }

  constructor(options) {
    super(options);

    this.template = _.template( template );
    //this.template = _.template( $('#bookTemplate').html() );
  }

  get events() {
    return {
      'click .delete': 'deleteBook'
    };
  }

  initialize() {

  }

  render() {
    this.$el.html( this.template( this.model.toJSON() ));
    return this;
  }

  deleteBook() {
    this.model.destroy();
    this.remove();
  }

}