/*jshint esnext:true */

import TaskView from './todo';

const { View } = Backbone;

export default class TasksView extends View {
  constructor(options) {
    super(options);
  }

  get tagName() {
    return 'ul';
  }

  initialize() {

    // At initialization, we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in localStorage.

    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'all', this.render);
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'change:completed', this.filterOne);
    this.listenTo(this.collection, 'filter', this.filterAll); 

    this.collection.fetch();
    this.render();
  }

  render() {
    //this.collection.each( task => this.addOne(task) );
    return this;
  }

  // Add a single todo item to the list by creating a view for it, then
  // appending its element to the `<ul>`.
  addOne(task) {
    // create new TaskView instance and add it in root element (ul)
    
    const view = new TaskView({model: task});
    this.$el.append( view.render().el );
  }

  // Add all items in the Todos collection at once.
  addAll() {
    this.$el.html('');
    this.collection.each(this.addOne, this);
  }

  filterOne(todo) {
    todo.trigger('visible');
  }

  filterAll() {
    this.collection.each(this.filterOne, this);
  }
}