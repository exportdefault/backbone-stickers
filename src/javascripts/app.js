import AppLayout from './views/layouts/root';

export default class Application extends Backbone.Marionette.Application {

  setRootLayout() { 
    this.root = new AppLayout();
  }

}