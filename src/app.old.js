const { Model, View, Collection } = Backbone;


// template helper
var $template = id => _.template($('#' + id).html());

class Person extends Model {
  constructor(params) {
    super(params); 
  }

  defaults() {
    return {
        name: 'unnamed',
        age: 23,
        job: 'web developer'
      };
  }

  walk() {
    return this.get('name') + ' is walking.';
  }

  validate(attr) {
    console.log('validate: ' + JSON.stringify(attr));
  }
}

let somePerson = new Person();

console.log(somePerson.toJSON());

let anotherPerson = new Person({
  name: 'Sasha',
  age: 22,
  job: 'full stack developer'
});

console.log(anotherPerson.toJSON());
console.log(anotherPerson.get('name'));
console.log(anotherPerson.walk());

anotherPerson.set('age', -25); 

// -------------------------------------------------------

class PersonView extends View {
  
  get tagName() {
    return 'li';
  }

  get template() {
    return $template('person-id'); //_.template( $('#person-id').html() );
  }

  constructor(options) {
    super(options);
  }

  initialize() {
    //console.log('Init PersonView entity');
    //console.log(this.model);
    //this.listenTo(this.model, 'change', this.render);
  }

  render() {
    console.log('Render method call');
    //this.$el.html(this.model.get('name'));

    this.$el.html(this.template(this.model.toJSON()));

    /*this.$el.html(this.template(this.model.toJSON()));
    this.$el.toggleClass('completed', this.model.get('completed'));

    this.toggleVisible();
    this.$input = this.$('.edit');*/
    return this;
  }

  /*get className () {
    return "person";
  }

  get id () {
    return "some-people";
  }*/
}

/*
let view = new PersonView();
//console.log(view);
console.log(view.$el);
console.log(view.el);

view.render();
*/



var person = new Person();
var personView = new PersonView({model: person});
personView.render();
console.log(personView.$el.text());
console.log(personView.el);



class PeopleCollection extends Collection {
  constructor(options) {
    super(options);

    this.model = Person;
  }
}

var peopleCollection = new PeopleCollection();


peopleCollection.add(person);
peopleCollection.add(anotherPerson);
console.log(peopleCollection.length);



class PeopleView extends View {
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

    this.collection.each((person) => {
      console.log('each person: ' + JSON.stringify(person.toJSON()));
      var personView = new PersonView({model: person});
      this.$el.append(personView.render().el);
    });

    return this;
  }
}


var peopleView = new PeopleView({collection: peopleCollection});
peopleView.render();
console.log(peopleView.el);
//console.log(peopleView.$el.html());

/*import MyRouter from './router';

class Application {
  constructor () {
    new MyRouter();
    Backbone.history.start();
  }
}

$(() => {
  new Application();
});*/