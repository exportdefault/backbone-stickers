import BaseLayout   from './../core/layout';
import LoginTemplate from './../../templates/login.handlebars';

export default class LoginLayout extends BaseLayout {

  constructor(options) {
    super(options);
    //this.template = template;

    this.app = Backbone.Radio.channel('app');
  }

  template(model) {
    return LoginTemplate({});
  }

  events() {
    return {
      'click #login-btn'                      : 'onLoginAttempt',
      'click #signup-btn'                     : 'onSignupAttempt',
      'keyup #login-password-input'           : 'onPasswordKeyup',
      'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
    }
  }

  initialize() {
    console.log('LoginLayout::initializate() [...]');       
    //this.listenTo(this.app.request('session'), 'change:logged_in', this.render);

  }

  onClose() {
    //this.stopListening();
  }


  // Allow enter press to trigger login
  onPasswordKeyup(event) {
    var k = event.keyCode || event.which;

    if (k == 13 && $('#login-password-input').val() === '') {
      // prevent enter-press submit when input is empty
      event.preventDefault();
    } else if(k == 13){
      event.preventDefault();
      this.onLoginAttempt();
      return false;
    }
  }

  // Allow enter press to trigger signup
  onConfirmPasswordKeyup(event){
    var k = event.keyCode || event.which;

    if (k == 13 && $('#confirm-password-input').val() === ''){
      // prevent enter-press submit when input is empty      
      event.preventDefault();   
    } else if(k == 13){
      event.preventDefault();
      this.onSignupAttempt();
      return false;
    }
  }

  onLoginAttempt(event) {
    if(event) event.preventDefault();

    if(this.$("#login-form").parsley('validate')){
      Backbone.Radio.channel('app').request('session').login({
        username: this.$("#login-username-input").val(),
        password: this.$("#login-password-input").val()
      }, {
        success: function(mod, res) {
          Backbone.history.navigate('',  { trigger: true });          
          if(DEBUG) console.log("SUCCESS", mod, res);

        },
        error: function(err) {
          if(DEBUG) console.log("ERROR", err);
          //app.showAlert('Bummer dude!', err.error, 'alert-danger');
        }
      });
    } else {
      // Invalid clientside validations thru parsley
      if(DEBUG) console.log("Did not pass clientside validation");
    }
  }
  

  onSignupAttempt(event) {
    if(event) event.preventDefault();
    if(this.$("#signup-form").parsley('validate')) {
      Backbone.Radio.channel('app').request('session').signup({
        username: this.$("#signup-username-input").val(),
        password: this.$("#signup-password-input").val(),
        name: this.$("#signup-name-input").val()
      }, {
        success: function(mod, res){
          Backbone.history.navigate('',  { trigger: true });          
          if(DEBUG) console.log("SUCCESS", mod, res);

        },
        error: function(err){
          if(DEBUG) console.log("ERROR", err);
          //app.showAlert('Uh oh!', err.error, 'alert-danger'); 
        }
      });
    } else {
      // Invalid clientside validations thru parsley
      if(DEBUG) console.log("Did not pass clientside validation");
    }
  }




}



//window.session.off('change:logged_in', this.render);
//window.session.on('change:logged_in', this.render, this);