import Stickers     from './../collections/stickers';
import HeaderLayout from './../views/layouts/header';
import LoginLayout  from './../views/login';
import HomeLayout   from './../views/home';


//import HomeView     from './../views/layouts/home';
import AppLayout    from './../views/layouts/root';
import ListView     from './../views/list';
import Application  from './../app';


// TodoList Controller (Mediator)
// ------------------------------
//
// Control the workflow and logic that exists at the application
// level, above the implementation detail of views and models

export default class Controller extends Backbone.Marionette.Object {

  initialize() {
    console.log('Controller::initialize() [initializate collection Stickers]');
    this.collection = new Stickers(); //(?) @todo move

    this.app = Backbone.Radio.channel('app');


    this.collection.fetch();    

  }

  // Start the app by showing the appropriate views
  // and fetching the list of todo items, if there are any
  start() {
    console.log('controller start');
  }


  setAction(filter) {
    //this.router.trigger('filter', filter);

    if (!filter) {
      filter = 'home';
    }

    console.log('current filter: ' + filter);
    var options = {};

    if (this[filter] && typeof this[filter] === 'function') {

      if (filter === 'login') {
        options = _.extend(options, {requiresAuth: false});
      } else if (filter === 'logout' || filter === 'stickers') {
        options = _.extend(options, {requiresAuth: true});
      }


      this.checkAccess(filter, options, () => this[filter](options)) ;
    }

  }

  checkAccess(filter, options, callback) {
    // Need to be authenticated before rendering view.
    // For cases like a user's settings page where we need to double check against the server.
    if (typeof options !== 'undefined' && options.requiresAuth) {

      var self = this;
      var result = false;

      app.session.checkAuth({
          success: ( res => {
            console.log('succes');
            callback();
          }),
          error: ( res => {
            console.log('if u want logout, u need login first');          
            Backbone.history.navigate('login',  { trigger: true });   
            //result = false;
          })
      });

      // If auth successful, render inside the page wrapper
      //$('#content').html( self.currentView.render().$el);
      /*if (!Backbone.Radio.channel('app').request('session').get('logged_in')) {
        console.log('if u want logout, u need login first');
        //self.navigate("/", { trigger: true, replace: true });
        Backbone.history.navigate('login',  { trigger: true });   

        return false;      
      }*/
    } else {
      callback();
    }
    //console.log('check auth: ' + result);
    //return result;
  }

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

    //setView(view);
  }



  home() {
    var view = new HomeLayout();
    this.changeView(view);
  }

  login() {
    var view = new LoginLayout();
    this.changeView(view);
  }

  logout() {
    console.log('logout epta');

    // No callbacks needed b/c of session event listening
    Backbone.Radio.channel('app').request('session').logout({}, {

      success: () => {
        console.log('success logout');          
        Backbone.history.navigate('',  { trigger: true });
      },
      complete: () => {
        console.log('complete logout');          
        //Backbone.history.navigate('login',  { trigger: true });       
      }
    });
  }

  stickers() {
    console.log('stickers epta');

    console.log('Controller::stickers() [init List]');
    
    var listView = new ListView({
      collection: this.collection
    });

    Backbone.Radio.channel('app').request('layout').showChildView('main', listView);   
  }

}




/*
  showLogin() {
    var loginView = new LoginView();
    this.changeView(loginView);
  }

  showProfile() {
    var that = this;
    var userModel = new UserModel({
      id : Session.get('user').id
    });
    userModel.fetch()
      .done(function(){
        var profileView = new ProfileView({
          model : userModel
        });
        that.changeView(profileView);
      })
      .fail(function(error){
        //In case that session expired
        that.fetchError(error);
      });
  }

  showHome() {
    //var homeView = new HomeView();
    //this.changeView(homeView);

    console.log('Controller::showHeader() [init HeaderLayout]');
    
    var header = new HeaderLayout({
      collection: list
    });

    this.changeView(header);
    this.appChannel.request('layout').showChildView('header', header);


    /*this.showHeader(this.collection);
    //this.showFooter(this.collection);
    this.showTodoList(this.collection);
    //this.collection.on('all', this.updateHiddenElements, this);
    
    console.log('Controller::start() [collection fetch]');
    this.collection.fetch();* /

  }

  fetchError(error) {
    //If during fetching data from server, session expired
    // and server send 401, call getAuth to get the new CSRF
    // and reset the session settings and then redirect the user
    // to login
    if(error.status === 401){
      Session.getAuth(function(){
        Backbone.history.navigate('login', { trigger : true });
      });
    }
  }


  showHeader(list) {
    console.log('Controller::showHeader() [init HeaderLayout]');
    
    var header = new HeaderLayout({
      collection: list
    });

    this.appChannel.request('layout').showChildView('header', header);
  }

  showFooter(todoList) {
    console.log('in the future init showFooter');
    /*var footer = new TodoMVC.FooterLayout({
      collection: todoList
    });
    TodoMVC.App.root.showChildView('footer', footer);* /
  }

  showTodoList(list) {
    console.log('Controller::showTodoList() [init List]');
    
    var listView = new ListView({
      collection: list
    });

    this.appChannel.request('layout').showChildView('main', listView);
  }

  // Set the filter to show complete or all items
  filterItems(filter) {
    /*var newFilter = filter && filter.trim() || 'all';
    filterChannel.request('filterState').set('filter', newFilter);* /
  }

  setFilter(filter) {
    console.log('current filter: ' + filter);

  }

  actionSticker(id) {
    console.log('route# ' + id);
  }*/

