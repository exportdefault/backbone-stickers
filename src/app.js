/*jshint esnext:true */

import { AddTaskView, TasksView } from './views';

import Collection from './collection';
import Router     from './router';
import Model      from './model';


class Application {
  constructor () {
    this.init();
  }

  init() {

    // create instance of Router for testing
    new Router();
    Backbone.history.start();

    // create global (application level) tasks collection
    var tasks = new Collection();

    // create tasks view and render it into #todos
    var view = new TasksView({collection: tasks});
    $('#todos').html(view.render().el);
    
    // create form for create new task
    new AddTaskView({collection: tasks});

  }
}

// Load the application once the DOM is ready, using `jQuery.ready`
$(() => {
  new Application();
});
