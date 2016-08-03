import Cache from './../helpers/cache';

// The Filters Router class
export default class Router extends Backbone.Router {
  constructor (options) {

    super({routes: {
        '*filter': 'setFilter'
      }});

    this.collection = options.collection;    

    (new Cache()).setData('filter', '');
  }

  setFilter(param = '') {

    // Set the current filter to be used.
    (new Cache()).setData('filter', param);

    // Trigger a collection filter event, causing 
    // hiding/unhiding of Todo view items.
    this.collection.trigger('filter');
  }

}