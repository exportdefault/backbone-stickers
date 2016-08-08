import BaseLayout   from './../../core/layout';
import HeaderLayout from './header';
import FooterLayout from './footer';

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
    this.showChildView('header', new HeaderLayout());
    this.showChildView('footer', new FooterLayout());
  }
}