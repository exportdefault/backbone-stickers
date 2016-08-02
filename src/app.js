import { AddTaskView, TaskView, TasksView } from './views';

import TaskCollection   from './collection';
import MyRouter         from './router';
import TaskModel        from './model';


class Application {
  constructor () {
    this.init();
  }

  init() {

    new MyRouter();
    Backbone.history.start();

    const titles = ['Go to shop', 'Get postcard', 'Go to work'];

    var tasks = new TaskCollection(titles.map( title => ({title: title}) ));

    var view = new TasksView({collection: tasks});
    $('#todos').html(view.render().el);
    
    new AddTaskView({collection: tasks});

  }
}

$(() => {
  new Application();
});