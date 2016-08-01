import MyRouter from './router';

class Application {
  constructor () {
    new MyRouter();
    Backbone.history.start();
  }
}

$(() => {
  new Application();
});