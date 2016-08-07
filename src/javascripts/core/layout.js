

export default class BaseLayout extends Backbone.Marionette.ItemView {
// class BaseItemView extends Backbone.Marionette.ItemView {

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

/*
Backbone.Marionette.ItemView.prototype.close = function() {
    this.remove();
    this.unbind();
    if (this.onClose) {
        this.onClose();
    }
};
*/