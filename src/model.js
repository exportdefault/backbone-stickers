const { Model } = Backbone;

export default class TaskModel extends Model {
  constructor(...args) {
    super(...args);
  }

  defaults() {
    return {
        title: 'unnamed',
        sort: 10
      };
  }

  validate(attr) {
    if(typeof attr.title === 'undefined' || !$.trim(attr.title)) {
      return "Remember to set a title for your todo.";
    }
  }

  initialize(){
    this.on("invalid", function(model, error){
      console.log(error);
    });
  }
}