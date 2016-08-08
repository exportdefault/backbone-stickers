export default class BaseRouter extends Backbone.Marionette.AppRouter {

  constructor (options) {
    super(options);
  }

  get appRoutes() {
    return {
      //'sticker/:id':  'actionSticker',
      '*action': 'filter',
    };
  }
}