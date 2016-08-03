/*jshint esnext:true */

import { template } from './../templates/item';
import Cache from './../helpers/cache';

const { View } = Backbone;


// Todo Item View class
export default class TaskView extends View {
 
  get tagName() {
    return 'li';
  }  

  constructor(options) {
    super(options);

    this.template = _.template( template );
  }

  events() {
    return {
      'click .edit': 'editTask',
      'click .delete': 'deleteTask',
      'click .toggle': 'toggleCompleted'
    };
  }

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));
    this.toggleVisible();    
    return this;
  }

  toggleVisible() {
    this.$el.toggleClass('hidden', this.isHidden);
  }

  get isHidden() {

    var isCompleted = this.model.get('completed'); // const
    var filter = (new Cache()).getData('filter');

    return !!(// hidden cases only
      (!isCompleted && filter === 'completed') ||
      (isCompleted && filter === 'active')
    );
  }

  // Toggle the `'completed'` state of the model.
  toggleCompleted() {
    this.model.toggle();
  }  

  remove(event) {
    this.$el.remove();
  }

  editTask(model) {
    var newTitle = prompt('Do you want change title?', this.model.get('title'));
    this.model.save('title', newTitle, {validate: true});
  }

  // Remove the item and destroy the model.
  deleteTask(model) {
    this.model.destroy();
  }
}



  //      'keypress .edit': 'updateOnEnter',
  // *If you hit `enter`, we're through editing the item.*
  /*updateOnEnter(e) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  }*/