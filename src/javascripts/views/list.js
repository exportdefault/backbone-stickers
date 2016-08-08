import ListTemplate from './../../templates/list.handlebars'; 
import FormValidate   from './../helpers/validate.js';
import StickerView from './sticker';

// Controls the rendering of the list of items, including the
// filtering of activs vs completed items for display.
export default class ListView extends Backbone.Marionette.CompositeView {

  initialize() {
    //this.listenTo(this.channel.request('filterState'), 'change:filter', this.render, this);
    //this.listenTo( this.collection, 'add', this.renderBook );
    //this.listenTo( this.collection, 'reset', this.render );
  }

  constructor(options) {
    super(options);

    this.template = ListTemplate; //'#template-todoListCompositeView';
    this.childView = StickerView;
    this.childViewContainer = '#sticker-list';
  }

  collectionEvents() {
    return {
      'change:completed': 'render',
      'all': 'render'
    };
  }

  ui() {
    return {
      //toggle: '#toggle-all',
      form: '#new-sticker',
    };
  }

  events() {
    return {
      //'click @ui.toggle': 'onToggleAllClick',
      'submit @ui.form': 'onSubmit',
    };
  }

  filter(child) {
    //var filteredOn = filterChannel.request('filterState').get('filter');
    //return child.matchesFilter(filteredOn);
    return 1;
  }

  onSubmit(event) {
    event.preventDefault();
    var data = {};

    var validator = new FormValidate('#new-sticker', (errors) => {
      if (!errors.length) {

        const $form = this.ui.form;
        $form.find('input').each( (i, el) => {
          if ($(el).val() != ''){

            data[el.id] = $(el).val();
            $(el).val('');
          }
        });

        data['user_id'] = Backbone.Radio.channel('app').request('session').user.get('id');
        data['like'] = false;
        this.collection.create( data );
      }
    });
  }
}