import BaseRouter from './../core/router'; 

export default class Router extends BaseRouter {

  constructor (options) {
    super(options);
  }

  get appRoutes() {
    return {
      //'login' : 'showLogin',
      //'profile' : 'showProfile',
      //'*default' : 'showHome'
      //'sticker/:id':  'actionSticker',
      //'*filter':      'setFilter',
      //'about': 'setFilter'
      '*action': 'setAction',
    };
  }

  // Routes that need authentication and if user is not authenticated
  // gets redirect to login page
  /*requresAuth() {
    return [
      '#profile'
    ];
  }

  // Routes that should not be accessible if user is authenticated
  // for example, login, register, forgetpasword ...
  preventAccessWhenAuth() {
    return [
      '#login'
    ];
  }

  before(params, next) {
    //Checking if user is authenticated or not
    //then check the path if the path requires authentication 
    var isAuth = Session.get('authenticated');
    var path = Backbone.history.location.hash;
    var needAuth = _.contains(this.requresAuth, path);
    var cancleAccess = _.contains(this.preventAccessWhenAuth, path);

    if(needAuth && !isAuth){
      //If user gets redirect to login because wanted to access
      // to a route that requires login, save the path in session
      // to redirect the user back to path after successful login
      Session.set('redirectFrom', path);
      Backbone.history.navigate('login', { trigger : true });
    } else if(isAuth && cancleAccess) {
      //User is authenticated and tries to go to login, register ...
      // so redirect the user to home page
      Backbone.history.navigate('', { trigger : true });
    } else {
      //No problem handle the route
      return next();
    }     
  }

  //empty
  after() {}*/
}
















   /* super({routes: {
        '*filter': 'setFilter'
      }});
*/

    /*
    this.collection = options.collection;    

    (new Cache()).setData('filter', '');*/



  /*setFilter(param = '') {

    
    // Set the current filter to be used.
    (new Cache()).setData('filter', param);

    // Trigger a collection filter event, causing 
    // hiding/unhiding of Todo view items.
    this.collection.trigger('filter');
  }*/



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