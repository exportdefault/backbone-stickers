import template from './../../templates/sticker.handlebars'; 
//import Cache from './../helpers/cache';

// Todo List Item View
//
// Display an individual todo item, and respond to changes
// that are made to the item, including marking completed.
// 
// StikerView class
export default class StickerView extends Backbone.Marionette.ItemView {

  get tagName() {
    return 'div';
  } 

  /*template(serialized_model) {
    var title = serialized_model.title;
    return _.template(StikerTemplate)({
        title : title,
        //some_custom_attribute : some_custom_key
    });
  }*/

  get className() {
    return 'active' ;// + (this.model.get('liked') ? 'liked' : 'active');
  }

  constructor(options) {
    super(options);

    this.template = template; //_.template(StikerTemplate);
  }

  ui() {
    return {
      edit: '.edit',
      destroy: '.destroy',
      label: 'label',
      toggle: '.toggle',
      like: '.like'
    };
  }

  events() {
    return {
      'click @ui.destroy': 'deleteModel',
      'dblclick @ui.label': 'onEditClick',
      'keydown @ui.edit': 'onEditKeypress',
      'focusout @ui.edit': 'onEditFocusout',
      'click @ui.toggle': 'toggle',
      'click @ui.like': 'like'
    };
  }

  like(event) {
    event.preventDefault();
    this.model.toggle().save();
  }

  modelEvents() {
    return {
      change: 'render'
    };
  }

  deleteModel() {
    this.model.destroy();
    this.remove();
  }

  toggle() {
    this.model.toggle().save();
  }

  onEditClick() {
    this.$el.addClass('editing');
    this.ui.edit.focus();
    this.ui.edit.val(this.ui.edit.val());
  }

  onEditFocusout() {
    var todoText = this.ui.edit.val().trim();
    if (todoText) {
      this.model.set('title', todoText).save();
      this.$el.removeClass('editing');
    } else {
      this.destroy();
    }
  }

  onEditKeypress(e) {
    var ENTER_KEY = 13;
    var ESC_KEY = 27;

    if (e.which === ENTER_KEY) {
      this.onEditFocusout();
      return;
    }

    if (e.which === ESC_KEY) {
      this.ui.edit.val(this.model.get('title'));
      this.$el.removeClass('editing');
    }
  }


}