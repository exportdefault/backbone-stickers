import BaseController from './core/controller';
import { Stickers }   from './models/stickers';
import LoginLayout    from './views/login';
import HomeLayout     from './views/home';
import ListView       from './views/list';

// TodoList Controller (Mediator)
// Control the workflow and logic that exists at the application
// level, above the implementation detail of views and models
export default class Controller extends BaseController {

  start() {
    this.stickers = null;
  }

  // Action that need authentication and if user is not authenticated
  // gets redirect to login page
  requresAuth() {
    return [
      'stickers', 
      'logout'
    ];
  }

  // Routes that should not be accessible if user is authenticated
  // for example, login, register, forgetpasword ...
  preventAccessWhenAuth() {
    return [
      'login'
    ];
  }

  //home page
  home() {
    this.changeView(new HomeLayout());
  }

  //login page
  login() {
    this.changeView(new LoginLayout());
  }

  //login action
  logout() {

    // No callbacks needed b/c of session event listening
    Backbone.Radio.channel('app').request('session').logout({}, {
      success: () => {
        console.log('success logout');
        Backbone.history.navigate('',  { trigger: true });
      },
      complete: () => {}
    });
  }

  // stickers page
  stickers() {

    // if we show stickers page first time, to need initializate collection
    if (!this.stickers) {
      this.stickers = new Stickers(); 

    // fetching the list of items, if there are any  
      this.stickers.fetch();
    }
    
    var listView = new ListView({
      collection: this.stickers
    });

    this.changeView(listView);
  }

}

