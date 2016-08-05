import Stickers     from './../collections/stickers';
import HeaderLayout from './../views/layouts/header';
import ListView     from './../views/list';
import AppLayout    from './../views/layouts/root';
import Application  from './../app';


// TodoList Controller (Mediator)
// ------------------------------
//
// Control the workflow and logic that exists at the application
// level, above the implementation detail of views and models

export default class Controller extends Backbone.Marionette.Object {

  initialize() {
    this.appChannel = Backbone.Radio.channel('app');

    console.log('Controller::initialize() [initializate collection Stickers]');
    this.collection = new Stickers();
  }

  // Start the app by showing the appropriate views
  // and fetching the list of todo items, if there are any
  start() {
    this.showHeader(this.collection);
    //this.showFooter(this.collection);
    this.showTodoList(this.collection);
    //this.collection.on('all', this.updateHiddenElements, this);
    
    console.log('Controller::start() [collection fetch]');
    this.collection.fetch();
  }

  /*updateHiddenElements: function () {
    $('#main, #footer').toggle(!!this.todoList.length);
  },*/

  showHeader(list) {
    console.log('Controller::showHeader() [init HeaderLayout]');
    
    var header = new HeaderLayout({
      collection: list
    });

    this.appChannel.request('layout').showChildView('header', header);
  }

  showFooter(todoList) {
    console.log('in the future init showFooter');
    /*var footer = new TodoMVC.FooterLayout({
      collection: todoList
    });
    TodoMVC.App.root.showChildView('footer', footer);*/
  }

  showTodoList(list) {
    console.log('Controller::showTodoList() [init List]');
    
    var listView = new ListView({
      collection: list
    });

    this.appChannel.request('layout').showChildView('main', listView);
  }

  // Set the filter to show complete or all items
  filterItems(filter) {
    /*var newFilter = filter && filter.trim() || 'all';
    filterChannel.request('filterState').set('filter', newFilter);*/
  }

  setFilter(filter) {
    console.log('current filter: ' + filter);

  }

  actionSticker(id) {
    console.log('route# ' + id);
  }

}