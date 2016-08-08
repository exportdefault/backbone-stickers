export default class BaseLayout extends Backbone.Marionette.ItemView {
  constructor() {
    super();
  }

  close() {
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
  }
}