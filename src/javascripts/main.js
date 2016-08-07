/* jshint esnext:true */
/* global Backnone, $ */

/**
 * Main app initialization and initial auth check
 */

import SessionModel from './core/models/session';
import Application  from './app';
import Controller   from './controllers/controller';
import Router       from './routers/router';
import HeaderLayout from './views/layouts/header';
import FooterLayout from './views/layouts/footer';


// force ajax call on all browsers
$.ajaxSetup({ cache: false });


// create app instance
const app = new Application({
  container: '#app'
});


app.on('before:start', () => {
  app.setRootLayout();

  // Create a new session model and scope it to the app global
  // This will be a singleton, which other modules can access
  app.session = new SessionModel();

  // Global event aggregator
  app.eventAggregator = _.extend({}, Backbone.Events);

  app.controller = new Controller();

  // Create Backbone.Radio (@see https://github.com/marionettejs/backbone.radio)
  // for some property of application
  let channel = Backbone.Radio.channel('app');

  channel.reply('layout', () => app.root );
  channel.reply('session', () => app.session );
  channel.reply('controller', () => app.controller );



});


// After we initialize the app, we want to kick off the router
// and controller, which will handle initializing our Views
app.on('start', () => {


  // Check the auth status upon initialization,
  // before rendering anything or matching routes
  app.session.checkAuth({

    // Start the backbone routing once we have captured a user's auth status
    complete: function(){

      console.log(app.session.user);

      app.controller.router = new Router({
        controller: app.controller
      });

      app.controller.start();

      var header = new HeaderLayout();
      var footer = new FooterLayout();
      Backbone.Radio.channel('app').request('layout').showChildView('header', header);
      Backbone.Radio.channel('app').request('layout').showChildView('footer', footer);

      // HTML5 pushState for URLs without hashbangs
      //if (window.history && history.pushState) {
      //  Backbone.history.start({ pushState: true, root: '/' });
     // }
     // else {
        Backbone.history.start();
     // }

    }
  });
});

window.app = app;

// Load the application once the DOM is ready, using `jQuery.ready`
$(() => {
  app.start(); 
});


import './../stylesheets/base';
