const { Model, View, Collection, Router } = Backbone;



class TaskModel extends Model {
  constructor(params) {
    super(params); 
  }

  defaults() {
    return {
        title: 'unnamed',
        sort: 10
      };
  }

  validate(attr) {
    console.log('validate: ' + JSON.stringify(attr));
  }
}

// -----------------------------------

class TaskView extends View {
  
  get tagName() {
    return 'li';
  }

  get template() {
    return _.template( $('#task-template').html() );
  }

  constructor(options) {
    super(options);
  }

  initialize() {
    //this.listenTo(this.model, 'change', this.render);
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  events() {
    return {
      'click .edit': 'editTask',
      //'click span': 'onClickSpan'
    }
  }

  editTask(model) {
    var newTitle = prompt('you try change task', this.model.get('title'));
    this.model.set('title', newTitle)

    //var newTaskTitle = prompt('Write new title')
  }

  onClick(event) {
    console.log('click');
    console.log(event.target);
  }

}

// -----------------------------------

class TaskCollection extends Collection {
  constructor(options) {
    super(options);

    this.model = TaskModel;
  }
}


// -----------------------------------

class TasksView extends View {
  constructor(options) {
    super(options);
  }

  get tagName() {
    return 'ul';
  }

  initialize() {
    console.log(this.collection);
  }

  render() {
    // 1. loop from list
    // 2. render tempalte for each item 
    // 3. insert in main template (ul, this.$el)

    this.collection.each(this.addOne, this);


    /*(person) => {
      console.log('each person: ' + JSON.stringify(person.toJSON()));
      var personView = new PersonView({model: person});
      this.$el.append(personView.render().el);
    });*/

    return this;
  }


  addOne(task) {
    // create new TaskView instance and add it in root element (ul)
    
    let taskView = new TaskView({model: task});
    this.$el.append( taskView.render().el );
  }
}


// -----------------------------------

var tasks = new TaskCollection([
  {
    title: 'Go to shop',
    sort: 4
  },
  {
    title: 'Get postcard',
    sort: 3
  },
  {
    title: 'Go to work',
    sort: 5
  }
]);

var tasksView = new TasksView({collection: tasks});

$('#todos').html(tasksView.render().el);

//console.log(taskView.render().el);
