import TaskModel  from './model';

const { Collection, LocalStorage } = Backbone;

export default class TaskCollection extends Collection {

  constructor(options) {
    super(options);
    
    this.model = TaskModel;
    this.localStorage = new LocalStorage('backbone-todomvc-es6');
  }
}