/* jshint esnext:true */
/* global Backnone, $ */

import SessionModel from './core/models/session';
import BaseRouter   from './core/router';
import Controller   from './controller';
import Application  from './app';

// force ajax call on all browsers
$.ajaxSetup({ cache: false });

//  Main app initialization and initial auth check
// create app instance
const app = new Application({
  container: '#app'
});

app.on('before:start', () => {

  // set page's layout and render element to page
  app.setRootLayout();

  // Create a new session model and scope it to the app global
  // This will be a singleton, which other modules can access
  app.session = new SessionModel();

  // Global event aggregator
  app.eventAggregator = _.extend({}, Backbone.Events);

  // Create controller, who
  app.controller = new Controller();

  // Create channel Backbone.Radio for access to app instance from other modules
  // @see https://github.com/marionettejs/backbone.radio
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

      // add router then we load data about 
      app.controller.router = new BaseRouter({
        controller: app.controller
      });

      app.controller.start();
      Backbone.history.start();

    }
  });
});


// for testing
window.app = app;

// Load the application once the DOM is ready, using `jQuery.ready`
$(() => {
  app.start(); 
});


import './../stylesheets/base';
