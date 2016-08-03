const { Model } = Backbone;

// Todo Model class
export default class TaskModel extends Model {
  constructor(...args) {
    super(...args);
  }

  // Define some default attributes for the todo.
  defaults() {
    return {
        title: '',
        completed: false
      };
  }

  // Toggle the `completed` state of this todo item.
  toggle() {
    this.save({
      completed: !this.get('completed')
    });
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