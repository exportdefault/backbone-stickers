//import { template as HeaderTemplate } from './../../templates/layouts/header'; 
import FooterTemplate from './../../../templates/layouts/footer.handlebars'; 

//console.log(Handlebars.compile(template));

// Layout Header View
//var filterChannel = Backbone.Radio.channel('filter');

export default class FooterLayout extends Backbone.Marionette.ItemView {


  constructor(options) {
    super(options);
    //this.template = template;

  }

  template(model) {

    const session = Backbone.Radio.channel('app').request('session');

    let logged_in = session.get('logged_in');
    let username = logged_in ? session.user.get('username') : '';

    return FooterTemplate({
        logged_in : logged_in,
        username  : username
    });
  }

  initialize() {

    this.app = Backbone.Radio.channel('app');
        
    this.listenTo(this.app.request('session'), 'change:logged_in', this.render);
    console.log('HeaderLayout::initializate() [...]');
  }

  onClose() {
    this.stopListening();
  }
}