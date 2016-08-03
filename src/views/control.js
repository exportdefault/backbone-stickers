/*jshint esnext:true */

import { template } from './../templates/control';
import Cache from './../helpers/cache';

const { View } = Backbone;

export default class ControlView extends View {
  
  get el() {
    return '#control';
  }

  constructor(options) {
    super(options);

    this.template = _.template( template );


    this.render();

    this.$input = this.$el.find('#new-todo');
    this.$toggle = this.$el.find('#toggle-all');
  
  }


  // Delegate events for creating new items and clearing completed ones.
  get events() {
    return {
      'keypress #new-todo': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete',
      'submit': 'submit'
    };
  }

  // Clear all completed todo items and destroy their models.
  clearCompleted() {
    _.invoke(this.collection.completed(), 'destroy');
    return false;
  }

  toggleAllComplete() {
    this.$toggle = this.$el.find('#toggle-all')[0];
    const completed = this.$toggle.checked;
    console.log(completed);
    this.collection.each(todo => todo.save({ completed }));
  }

  render() {
    //this.$el.html(this.template);

    const completed = this.collection.completed().length;
    const remaining = this.collection.remaining().length;

    let filter = (new Cache()).getData('filter');

    this.$el.html(this.template({
      completed: completed,
      remaining: remaining
    }));

    this.$el.find('#filters li a')
      .removeClass('selected')
      .filter('[href="#/' + (filter || '') + '"]')
      .addClass('selected');

    this.$toggle = this.$el.find('#toggle-all')[0];
    this.$toggle.checked = !remaining;
    
    return this;
  }  

  initialize() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'all', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'change:completed', this.render);
    this.listenTo(this.collection, 'filter', this.filterAll);
  }

  filterOne(todo) {
    todo.trigger('visible');
  }

  filterAll() {
    this.collection.each(this.filterOne, this);
  }

  submit(e) {
    console.log('submit');
    e.preventDefault();

    this.$input = this.$el.find('#new-todo');

    let title = this.$input.val().trim();

    // Generate the attributes for a new Todo item.
    let attr = {
      title: this.$input.val().trim(),
      order: this.collection.nextOrder(),
      completed: false     
    };

    var task = new this.collection.model(attr, {validate: true});

    if (!task.validationError) {
      this.collection.create(task);
      this.$input.val('');
    }
  }
}