import TaskModel  from './../models/model';

const { Collection, LocalStorage } = Backbone;


// TodoList Collection class
export default class TaskCollection extends Collection {

  constructor(options) {
    super(options);

    // Hold a reference to this collection's model.
    this.model = TaskModel;

    // Save all of the todo items under the `'todos'` namespace.
    this.localStorage = new LocalStorage('backbone-todomvc-es6');
  }

  completed() {
    return this.filter(todo => todo.get('completed'));
  }

  remaining() {
    return this.without(...this.completed());
  }

  // We keep the Todos in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new
  // items.
  nextOrder() {
    if (!this.length) {
      return 1;
    }

    return this.last().get('order') + 1;
  }

  // Todos are sorted by their original insertion order.
  comparator(todo) {
    return todo.get('order');
  }

}