  

//var filterChannel = Backbone.Radio.channel('filter');


// This file acts as a Service, providing
// the rest of the app access to the filter state
// as needed, without them needing to know the implementation
// details

/*
  var filterState = new Backbone.Model({
    filter: 'all'
  });

  var filterChannel = Backbone.Radio.channel('filter');
  filterChannel.reply('filterState', function () {
    return filterState;
  });
*/

// Handles a single dynamic route to show
// the active vs complete todo items

// The router class
export default class Router extends Backbone.Marionette.AppRouter {

  get appRoutes() {
    return {
      'sticker/:id':  'actionSticker',
      '*filter':      'setFilter',
      //'about': 'setFilter'
    };
  }

  constructor (options) {
    super(options);


   /* super({routes: {
        '*filter': 'setFilter'
      }});
*/

    /*
    this.collection = options.collection;    

    (new Cache()).setData('filter', '');*/
  }

  /*setFilter(param = '') {

    
    // Set the current filter to be used.
    (new Cache()).setData('filter', param);

    // Trigger a collection filter event, causing 
    // hiding/unhiding of Todo view items.
    this.collection.trigger('filter');
  }*/

}