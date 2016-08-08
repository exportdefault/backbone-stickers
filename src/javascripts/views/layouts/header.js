import HeaderTemplate from './../../../templates/layouts/header.handlebars'; 

export default class HeaderLayout extends Backbone.Marionette.ItemView {


  constructor(options) {
    super(options);
  }

  onRender() {

    let filter = window.location.hash.substr(1) || '';

    this.ui.nav.find('li a')
      .removeClass('selected')
      .filter('[href="#' + (filter || '') + '"]')
      .addClass('selected');
  }

  template(model) {

    const session = Backbone.Radio.channel('app').request('session');

    let logged_in = session.get('logged_in');
    let username = logged_in ? session.user.get('username') : '';

    return HeaderTemplate({
        logged_in : logged_in,
        username  : username
    });
  }

  initialize() {

    this.listenTo(Backbone.Radio.channel('app').request('session'), 'change:logged_in', this.render);

    Backbone.history.on("all", (route, router) => {
        this.onRender();
    });

  }

  onClose() {
    this.stopListening();
  }

  // UI bindings create cached attributes that
  // point to jQuery selected objects
  ui() {
    return {
      form: '#new-sticker',
      nav: '#menu'
    };
  }
}