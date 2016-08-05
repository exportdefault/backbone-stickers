
//var filterChannel = Backbone.Radio.channel('filter');


export default class AppLayout extends Backbone.Marionette.LayoutView {

  constructor(options) {
    super(options);
  }

  get el() {
    return '#todoapp';
  }

  regions() {
    return {
      header: '#header',
      main: '#main',
      footer: '#footer'
    };
  }

  initialize() {
    console.log('AppLayout::initialize() [...]');
  }
}