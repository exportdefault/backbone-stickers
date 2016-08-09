import BaseLayout   from './../../core/layout';
import HeaderLayout from './header';
import FooterLayout from './footer';

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