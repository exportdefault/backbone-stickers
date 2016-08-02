import TaskCollection   from './collection';

const { View } = Backbone;



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
    this.model.set('title', newTitle, {validate: true});
  }

  deleteTask(model) {
    this.model.destroy();
  }

  remove(event) {
    this.$el.remove();
  }
}


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

    var $input = $(e.currentTarget).find('input[type=text]');

    var newTaskTitle = $input.val();
    var newTask = new this.collection.model({title: newTaskTitle}, {validate: true});

    if (!newTask.validationError) {
      this.collection.add(newTask);
      $input.val('');
    }
  }
}


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

    /*this.collection.each(function(task){
      this.addOne(task);

      //console.log(arguments);
      //this.addOne, this
    });*/

    this.collection.each( task => this.addOne(task) );

    return this;
  }


  addOne(task) {
    // create new TaskView instance and add it in root element (ul)
    //console.log(task);
    
    let taskView = new TaskView({model: task});
    this.$el.append( taskView.render().el );
  }
}


// ----------------------------------------------------------------------

class HomeView extends Backbone.View {

  initialize () {
    this.template = $('script[name="home"]').html();
  }

  render () {
    this.$el.html(_.template(this.template));
    return this;
  }
}

class AboutView extends Backbone.View {

  initialize () {
    this.template = $('script[name="about"]').html();
  }

  render () {
    this.$el.html(_.template(this.template));
    return this;
  }
}

export { HomeView, AboutView, AddTaskView, TaskView, TasksView };