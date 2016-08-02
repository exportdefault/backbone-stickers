/*jshint esnext:true */

import TaskCollection   from './collection';

const { View } = Backbone;


class TaskView extends View {
 
  get tagName() {
    return 'li';
  }  

  constructor(options) {
    super(options);

    this.template = _.template( $('#task-template').html() );
  }

  events() {
    return {
      'click .edit':    'editTask',
      'click .delete':  'deleteTask'
    };
  }

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  remove(event) {
    this.$el.remove();
  }

  editTask(model) {
    var newTitle = prompt('Do you want change title?', this.model.get('title'));
    this.model.save('title', newTitle, {validate: true});
  }

  deleteTask(model) {
    this.model.destroy();
  }
}


class AddTaskView extends View {
  
  get el() {
    return '#add-task';
  }

  constructor(options) {
    super(options);

    this.$input = this.$el.find('input[type=text]');
  }

  events() {
    return {
      'submit': 'submit'
    };
  }

  initialize() {}

  submit(e) {
    e.preventDefault();

    let title = this.$input.val();
    var task = new this.collection.model({title: title}, {validate: true});

    if (!task.validationError) {
      this.collection.create(task);
      this.$input.val('');
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
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'all', this.render);

    this.collection.fetch();
  }

  render() {
    //this.collection.each( task => this.addOne(task) );
    return this;
  }


  addOne(task) {
    // create new TaskView instance and add it in root element (ul)
    
    let view = new TaskView({model: task});
    this.$el.append( view.render().el );
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