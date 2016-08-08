export default class BaseController extends Backbone.Marionette.Object {

  constructor (options) {
    super(options);
  }

  // Action that need authentication and if user is not authenticated
  // gets redirect to login page
  requresAuth() {
    return [];
  }

  // Routes that should not be accessible if user is authenticated
  // for example, login, register, forgetpasword ...
  preventAccessWhenAuth() {
    return [];
  }

  filter(filter) {

    filter = filter || 'home';
    let options = {};

    if (this[filter] && typeof this[filter] === 'function') {

      if(~this.requresAuth().indexOf(filter)) {
        options = _.extend(options, {requiresAuth: true});
      }

      if(~this.preventAccessWhenAuth().indexOf(filter)) {
        options = _.extend(options, {preventAccessWhenAuth: true});
      }

      this.checkAccess(filter, options, () => this[filter](options)) ;
    }

  }


  checkAccess(filter, opt = {}, callback) {

    // Need to be authenticated before rendering view.
    // For cases like a user's settings page where we need to double check against the server.
    if (opt.requiresAuth || opt.preventAccessWhenAuth ) {

      var self = this;

      app.session.checkAuth({
          success: ( res => {
            if (opt.preventAccessWhenAuth) {
              Backbone.history.navigate('',  { trigger: true });
            } else {
              callback();            
            }
          }),
          error: ( res => {        
            if (opt.requiresAuth) {
              Backbone.history.navigate('login',  { trigger: true });
            } else {
              callback();            
            }
          })
      });
    } else {
      callback();
    }
  }

  // if we change route, then to need change current view
  changeView(view) {

    // Close and unbind any existing page view
    if (this.currentView  && _.isFunction(this.currentView.close)) {
      this.currentView.close();
    }

    // Establish the requested view into scope
    this.currentView = view;
    
    // Re-delegate events (unbound when closed)
    //this.currentView.delegateEvents(this.currentView.events)

    Backbone.Radio.channel('app').request('layout').showChildView('main', view);
  }
}
