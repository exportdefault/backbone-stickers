import ListTemplate from './../../templates/list.handlebars'; 
import FormValidate   from './../helpers/validate.js';
import StickerView from './sticker';

// Controls the rendering of the list of items, including the
// filtering of activs vs completed items for display.
export default class ListView extends Backbone.Marionette.CompositeView {

  initialize() {
    this.listenTo( this.childView, 'reset', this.render );
  }

  constructor(options) {
    super(options);

    //this.template = ListTemplate;
    this.childView = StickerView;
    this.childViewContainer = '#sticker-list';
  }

  template() {
    const session = Backbone.Radio.channel('app').request('session');

    return ListTemplate({
        is_admin : (session && session.user) ? session.user.get('is_admin') : false
    });
  }

  collectionEvents() {
    return {
      'change:completed': 'render',
      'all': 'render'
    };
  }

  childEvents() {
    return {
      'sticker:edit': this.onStickerEdit,
      'sticker:cancel_edit': this.onCancelEdit
    }
  }

  // @todo refactoring
  onStickerEdit(view) {
    this.ui.form_title.text('Edit selected sticker:');
    this.ui.form_button.text('Edit sticker');
    this.ui.form.find('#id').val(view.model.get('id'));
    this.ui.form.find('.cancel').show();
    this.ui.form.find('#title').val(view.model.get('title'));
    this.ui.form.find('#description').val(view.model.get('description'));
    $(this.childViewContainer).parent().find('div').removeClass('editing');
    view.$el.addClass('editing'); 
  }

  // @todo refactoring
  onCancelEdit(view) {
    this.ui.form.find('input').val('');
    this.ui.form_title.text('Add new sticker:');
    this.ui.form_button.text('Add sticker');
    this.ui.form.find('#id').val('');
    this.ui.form.find('.cancel').hide();
    $(this.childViewContainer).parent().find('div').removeClass('editing');
  }

  ui() {
    return {
      form: '#new-sticker',
      form_title: '#new-sticker h2',
      form_button: 'button.btn',
      cancel_edit: '.cancel'
    };
  }

  events() {
    return {
      'click @ui.form_button': 'onSubmit',
      'click @ui.cancel_edit': 'onCancelEdit'
    };
  }

  onSubmit(event) {
    event.preventDefault();
    var data = {};

    var validator = new FormValidate('#new-sticker', (errors) => {
      if (!errors.length) {

        const $form = this.ui.form;
        $form.find('input').each( (i, el) => {
          if ($(el).val() !== ''){

            data[el.id] = $(el).val();
            $(el).val('');
          }
        });

        data.like = false;

        if (data.id) {
          let item = this.collection.get(data.id);
          item.save(data);
        } else {
          data.user_id = Backbone.Radio.channel('app').request('session').user.get('id');

          this.collection.create(data, {
            wait: true,
            success: (model, response) => this.onCancelEdit(),
            error: (model, error) => {}
          });
        }
      }
    });
  }
}