export default class BaseRouter extends Backbone.Marionette.AppRouter {

  constructor (options) {
    super(options);
  }

  get appRoutes() {
    return {
      //'sticker/:id':  'actionSticker',
      '*action': 'setAction',
    };
  }
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

/*export default class BaseRouter extends Backbone.Marionette.AppRouter {
  constructor(options) {
    super(options);
    //console.log('baseroute');
  }

  before(params, next) {
    return next();
  }

  after() {}

  // overide method for adding autorization on router's level
  route(route, name, callback) {

    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) {
      callback = this[name];
    }

    var router = this;

    Backbone.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);

      //if (router.execute(callback, args, name) !== false) {}

      var next = function() {
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
        router.after.apply(router, args);   
      };
      router.before.apply(router, [args, next]);
    });
    return this;
  }

}*/