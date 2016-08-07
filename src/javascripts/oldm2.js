/* jshint esnext:true */
/* global Backnone, $ */

import Application  from './app';
import Controller   from './controllers/controller';
import Router       from './routers/router';
import Sticker      from './models/sticker';
import Stickers     from './collections/stickers';
import Session      from './models/session';


// create app instance
const app = new Application({
  container: '#app'
});

app.on('before:start', () => {
  app.setRootLayout();

  // Create Backbone.Radio (@see https://github.com/marionettejs/backbone.radio)
  // for app root layout. Use in controller for append regions
  let channel = Backbone.Radio.channel('app');
  channel.reply('layout', () => app.root );

});


// After we initialize the app, we want to kick off the router
// and controller, which will handle initializing our Views
app.on('start', () => {

  app.session = new Session();
  console.log('session');

  let channel = Backbone.Radio.channel('app');
  channel.reply('session', () => app.session );

  app.session.getAuth((response) => {
    const controller = new Controller();

    new Router({
      controller: controller
    });

    controller.start();
    Backbone.history.start();
  });
});


// Load the application once the DOM is ready, using `jQuery.ready`
$(() => {
  app.start(); 
});


import './../stylesheets/base';
