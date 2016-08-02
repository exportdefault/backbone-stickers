import TaskModel  from './model';

const { Collection } = Backbone;

export default class TaskCollection extends Collection {

  get model() {
    return TaskModel;
  }

  constructor(options) {
    super(options);
    //this.model = TaskModel;
  }
}