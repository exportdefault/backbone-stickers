//let instance = null;

// singelton
class Application extends Backbone.Marionette.Application {
  constructor(params) {
    super(params);

    /*if (!instance) {
      instance = this;
    }

    return instance;*/
  }
}

export default Application;