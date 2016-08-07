import StickerView from './sticker';
import template from './../../templates/list.handlebars'; 

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

    this.template = template; //'#template-todoListCompositeView';
    this.childView = StickerView;
    this.childViewContainer = '#sticker-list';
  }

  collectionEvents() {
    return {
      'change:completed': 'render',
      'all': 'setCheckAllState'
    };
  }

  ui() {
    return {
      toggle: '#toggle-all'
    };
  }

  events() {
    return {
      'click @ui.toggle': 'onToggleAllClick'
    };
  }

  filter(child) {
    //var filteredOn = filterChannel.request('filterState').get('filter');
    //return child.matchesFilter(filteredOn);
    return 1;
  }

  setCheckAllState() {
    function reduceCompleted(left, right) {
      return left && right.get('completed');
    }

    var allCompleted = this.collection.reduce(reduceCompleted, true);
    this.ui.toggle.prop('checked', allCompleted);
    this.$el.parent().toggle(!!this.collection.length);
  }

  onToggleAllClick(e) {
    var isChecked = e.currentTarget.checked;

    this.collection.each(function (todo) {
      todo.save({ completed: isChecked });
    });
  }
}