import BaseLayout   from './../core/layout';
import HomeTemplate from './../../templates/home.handlebars';

export default class HomeLayout extends BaseLayout {

  constructor(options) {
    super(options);
    //this.template = template;


  }

  template(model) {

    const session = Backbone.Radio.channel('app').request('session');

    let logged_in = session.get('logged_in');
    let username = logged_in ? session.user.get('username') : '';

    return HomeTemplate({
        logged_in : logged_in,
        username  : username
    });
  }

  initialize() {

    const session = Backbone.Radio.channel('app').request('session');

    console.log('HomerLayout::initializate() [...]');       
    this.listenTo(this.session, 'change:logged_in', this.render);

  }

  onClose() {
    this.stopListening();
  }
}



//window.session.off('change:logged_in', this.render);
//window.session.on('change:logged_in', this.render, this);