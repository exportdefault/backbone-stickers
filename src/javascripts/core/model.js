export default class BaseModel extends Backbone.Model {
  constructor(...args) {
    super(...args);
  }

  /*close() {
    if(this.childViews){
      this.childViews.close();
    }
    this.remove();      
  }*/
}