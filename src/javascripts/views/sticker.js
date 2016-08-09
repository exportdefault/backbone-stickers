import StikerTemplate from './../../templates/sticker.handlebars'; 

// StikerView class
export default class StickerView extends Backbone.Marionette.ItemView {

  get tagName() {
    return 'div';
  } 

  constructor(options) {
    super(options);
  }

  template(serialized_model) {
    const session = Backbone.Radio.channel('app').request('session');

    return StikerTemplate(_.extend(serialized_model, {
        is_admin : (session && session.user) ? session.user.get('is_admin') : false
    }));
  }

  ui() {
    return {
      edit: '.edit',
      destroy: '.destroy',
      label: '.label',
      like: '.like'
    };
  }

  events() {
    return {
      'click @ui.destroy': 'deleteModel',
      'dblclick @ui.label': 'onEditClick',
      'focusout @ui.edit': 'onEditFocusout',
      'click @ui.like': 'like'
    };
  }

  modelEvents() {
    return {
      change: 'render'
    };
  }

  like(event) {
    event.preventDefault();
    this.model.toggle().save();
  }

  deleteModel(event) {
    event.preventDefault();

    this.model.destroy({
      wait: true,
      success: (model, response) => this.remove(),
      error: (model, error) => {}
    });
  }

  toggle(event) {
    event.preventDefault();    
    this.model.toggle().save();
  }

  onEditClick() {
    if (this.$el.hasClass('editing')) {
      this.trigger("sticker:cancel_edit");
    } else {
      this.trigger("sticker:edit");
    }
  }

  // @todo delete
  onEditFocusout() {
    /*var todoText = this.ui.edit.val().trim();
    if (todoText) {
      this.model.set('title', todoText).save();
      this.$el.removeClass('editing');
    } else {
      this.destroy();
    }*/
  }
  
  // @todo delete
  onEditKeypress(e) {
    /*var ENTER_KEY = 13;
    var ESC_KEY = 27;

    if (e.which === ENTER_KEY) {
      this.onEditFocusout();
      return;
    }

    if (e.which === ESC_KEY) {
      this.ui.edit.val(this.model.get('title'));
      this.$el.removeClass('editing');
    }*/
  }
}