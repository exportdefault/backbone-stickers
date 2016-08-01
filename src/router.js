import { HomeView, AboutView } from './views';

export default class Router extends Backbone.Router {
  constructor () {
    super({
      routes: {
        '': 'home',
        'about': 'about'
      }
    });
  }

  home () {
    console.log('Route#home was called!');
    var view = new HomeView();
    $('#app').html(view.render().$el);
  }

  about () {
    console.log('Route#about was called!');
    var view = new AboutView();
    $('#app').html(view.render().$el);
  }
}