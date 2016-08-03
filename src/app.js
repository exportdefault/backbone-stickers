/*jshint esnext:true */

import Collection   from './collections/collection';
import Router       from './routers/router';
import ControlView  from './views/control';
import TasksView    from './views/todos';


class Application {
  constructor () {
    this.init();
  }

  init() {

    // create global (application level) tasks collection
    var tasks = new Collection();

    // create tasks view / control view and render it
    var listView = new TasksView({collection: tasks});
    new ControlView({collection: tasks});
    
    $('#todos').html(listView.render().el);

    // create instance of Router for testing
    new Router({collection: tasks});
    Backbone.history.start();    

  }
}

// Load the application once the DOM is ready, using `jQuery.ready`
$(() => {
  new Application();
});


//$('#control').html(controlView.render().el);
//$('#todos').html(listView.render().el);