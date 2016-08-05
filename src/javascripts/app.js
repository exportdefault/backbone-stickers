import AppLayout from './views/layouts/root';

export default class Application extends Backbone.Marionette.Application {

  setRootLayout() {
    console.log('Application::setRootLayout() [...]');    
    this.root = new AppLayout();
  }

  initialize(options) {
    this.mergeOptions(options, ['router']);

    //this.router = 'future Backbone.Radio.channel'

    //console.log('My container:', options.container);
    //console.log('This router:', this.router);
  }

}