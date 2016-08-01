import MyRouter from './router';

const { Model, View, Collection, Router } = Backbone;

class Application {
  constructor () {
    new MyRouter();
    Backbone.history.start();
  }
}

$(() => {
  new Application();
});


class TaskModel extends Model {
  constructor(params) {
    super(params); 
  }

  defaults() {
    return {
        title: 'unnamed',
        sort: 10
      };
  }

  validate(attr) {
    console.log('validate: ' + JSON.stringify(attr));
  }
}

// -----------------------------------

class TaskView extends View {
  
  get tagName() {
    return 'li';
  }

  get template() {
    return _.template( $('#task-template').html() );
  }

  constructor(options) {
    super(options);
  }

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);

    //this.model.on('change', this.render, this);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  events() {
    return {
      'click .edit': 'editTask',
      'click .delete': 'deleteTask'
    }
  }

  editTask(model) {
    var newTitle = prompt('you try change task', this.model.get('title'));
    this.model.set('title', newTitle)
  }

  deleteTask(model) {
    this.model.destroy();
    console.log(tasks);
  }

  remove(event) {
    this.$el.remove();
  }

}

// -----------------------------------

class TaskCollection extends Collection {
  constructor(options) {
    super(options);

    this.model = TaskModel;
  }
}


// -----------------------------------

class TasksView extends View {
  constructor(options) {
    super(options);
  }

  get tagName() {
    return 'ul';
  }

  initialize() {
    //this.collection.on('add',)

    this.listenTo(this.collection, 'add', this.addOne);
    console.log(this.collection);
  }

  render() {
    // 1. loop from list
    // 2. render tempalte for each item 
    // 3. insert in main template (ul, this.$el)

    this.collection.each(this.addOne, this);


    /*(person) => {
      console.log('each person: ' + JSON.stringify(person.toJSON()));
      var personView = new PersonView({model: person});
      this.$el.append(personView.render().el);
    });*/

    return this;
  }


  addOne(task) {
    // create new TaskView instance and add it in root element (ul)
    
    let taskView = new TaskView({model: task});
    this.$el.append( taskView.render().el );
  }
}


// -----------------------------------


class AddTaskView extends View {
  

  get el() {
    return '#add-task';
  }

  constructor(options) {
    super(options);

    //this.el = '#add-task';
  }

  initialize() {
    //console.log(this.$el.html());
  }

  events() {
    return {
      'submit': 'submit'
    }
  }

  submit(e) {
    e.preventDefault();
    // console.log('form send');

    var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
    // console.log(newTaskTitle);
    // return false;

    var newTask = new TaskModel({title: newTaskTitle});
    this.collection.add(newTask);
  }
}






// -----------------------------------

var tasks = new TaskCollection([
  {
    title: 'Go to shop',
    sort: 4
  },
  {
    title: 'Get postcard',
    sort: 3
  },
  {
    title: 'Go to work',
    sort: 5
  }
]);

var tasksView = new TasksView({collection: tasks});

$('#todos').html(tasksView.render().el);

var addTaskView = new AddTaskView({collection: tasks});

//console.log(taskView.render().el);