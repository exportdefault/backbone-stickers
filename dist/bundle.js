/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _views = __webpack_require__(2);
	
	var _collection = __webpack_require__(4);
	
	var _collection2 = _interopRequireDefault(_collection);
	
	var _router = __webpack_require__(1);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _model = __webpack_require__(3);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Application = function () {
	  function Application() {
	    _classCallCheck(this, Application);
	
	    this.init();
	  }
	
	  _createClass(Application, [{
	    key: 'init',
	    value: function init() {
	
	      new _router2.default();
	      Backbone.history.start();
	
	      var titles = ['Go to shop', 'Get postcard', 'Go to work'];
	
	      var tasks = new _collection2.default(titles.map(function (title) {
	        return { title: title };
	      }));
	
	      var view = new _views.TasksView({ collection: tasks });
	      $('#todos').html(view.render().el);
	
	      new _views.AddTaskView({ collection: tasks });
	    }
	  }]);
	
	  return Application;
	}();
	
	$(function () {
	  new Application();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _views = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Router = function (_Backbone$Router) {
	  _inherits(Router, _Backbone$Router);
	
	  function Router() {
	    _classCallCheck(this, Router);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, {
	      routes: {
	        '': 'home',
	        'about': 'about'
	      }
	    }));
	  }
	
	  _createClass(Router, [{
	    key: 'home',
	    value: function home() {
	      console.log('Route#home was called!');
	      var view = new _views.HomeView();
	      $('#app').html(view.render().$el);
	    }
	  }, {
	    key: 'about',
	    value: function about() {
	      console.log('Route#about was called!');
	      var view = new _views.AboutView();
	      $('#app').html(view.render().$el);
	    }
	  }]);
	
	  return Router;
	}(Backbone.Router);
	
	exports.default = Router;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TasksView = exports.TaskView = exports.AddTaskView = exports.AboutView = exports.HomeView = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _collection = __webpack_require__(4);
	
	var _collection2 = _interopRequireDefault(_collection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Backbone = Backbone;
	var View = _Backbone.View;
	
	var TaskView = function (_View) {
	  _inherits(TaskView, _View);
	
	  _createClass(TaskView, [{
	    key: 'tagName',
	    get: function get() {
	      return 'li';
	    }
	  }, {
	    key: 'template',
	    get: function get() {
	      return _.template($('#task-template').html());
	    }
	  }]);
	
	  function TaskView(options) {
	    _classCallCheck(this, TaskView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TaskView).call(this, options));
	  }
	
	  _createClass(TaskView, [{
	    key: 'initialize',
	    value: function initialize() {
	      this.listenTo(this.model, 'change', this.render);
	      this.listenTo(this.model, 'destroy', this.remove);
	
	      //this.model.on('change', this.render, this);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(this.template(this.model.toJSON()));
	      return this;
	    }
	  }, {
	    key: 'events',
	    value: function events() {
	      return {
	        'click .edit': 'editTask',
	        'click .delete': 'deleteTask'
	      };
	    }
	  }, {
	    key: 'editTask',
	    value: function editTask(model) {
	      var newTitle = prompt('you try change task', this.model.get('title'));
	      this.model.set('title', newTitle, { validate: true });
	    }
	  }, {
	    key: 'deleteTask',
	    value: function deleteTask(model) {
	      this.model.destroy();
	    }
	  }, {
	    key: 'remove',
	    value: function remove(event) {
	      this.$el.remove();
	    }
	  }]);
	
	  return TaskView;
	}(View);
	
	var AddTaskView = function (_View2) {
	  _inherits(AddTaskView, _View2);
	
	  _createClass(AddTaskView, [{
	    key: 'el',
	    get: function get() {
	      return '#add-task';
	    }
	  }]);
	
	  function AddTaskView(options) {
	    _classCallCheck(this, AddTaskView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AddTaskView).call(this, options));
	
	    //this.el = '#add-task';
	  }
	
	  _createClass(AddTaskView, [{
	    key: 'initialize',
	    value: function initialize() {
	      //console.log(this.$el.html());
	    }
	  }, {
	    key: 'events',
	    value: function events() {
	      return {
	        'submit': 'submit'
	      };
	    }
	  }, {
	    key: 'submit',
	    value: function submit(e) {
	      e.preventDefault();
	
	      var $input = $(e.currentTarget).find('input[type=text]');
	
	      var newTaskTitle = $input.val();
	      var newTask = new this.collection.model({ title: newTaskTitle }, { validate: true });
	
	      if (!newTask.validationError) {
	        this.collection.add(newTask);
	        $input.val('');
	      }
	    }
	  }]);
	
	  return AddTaskView;
	}(View);
	
	var TasksView = function (_View3) {
	  _inherits(TasksView, _View3);
	
	  function TasksView(options) {
	    _classCallCheck(this, TasksView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TasksView).call(this, options));
	  }
	
	  _createClass(TasksView, [{
	    key: 'initialize',
	    value: function initialize() {
	      //this.collection.on('add',)
	
	      this.listenTo(this.collection, 'add', this.addOne);
	      console.log(this.collection);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;
	
	      // 1. loop from list
	      // 2. render tempalte for each item 
	      // 3. insert in main template (ul, this.$el)
	
	      /*this.collection.each(function(task){
	        this.addOne(task);
	         //console.log(arguments);
	        //this.addOne, this
	      });*/
	
	      this.collection.each(function (task) {
	        return _this4.addOne(task);
	      });
	
	      return this;
	    }
	  }, {
	    key: 'addOne',
	    value: function addOne(task) {
	      // create new TaskView instance and add it in root element (ul)
	      //console.log(task);
	
	      var taskView = new TaskView({ model: task });
	      this.$el.append(taskView.render().el);
	    }
	  }, {
	    key: 'tagName',
	    get: function get() {
	      return 'ul';
	    }
	  }]);
	
	  return TasksView;
	}(View);
	
	// ----------------------------------------------------------------------
	
	var HomeView = function (_Backbone$View) {
	  _inherits(HomeView, _Backbone$View);
	
	  function HomeView() {
	    _classCallCheck(this, HomeView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(HomeView).apply(this, arguments));
	  }
	
	  _createClass(HomeView, [{
	    key: 'initialize',
	    value: function initialize() {
	      this.template = $('script[name="home"]').html();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(_.template(this.template));
	      return this;
	    }
	  }]);
	
	  return HomeView;
	}(Backbone.View);
	
	var AboutView = function (_Backbone$View2) {
	  _inherits(AboutView, _Backbone$View2);
	
	  function AboutView() {
	    _classCallCheck(this, AboutView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AboutView).apply(this, arguments));
	  }
	
	  _createClass(AboutView, [{
	    key: 'initialize',
	    value: function initialize() {
	      this.template = $('script[name="about"]').html();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(_.template(this.template));
	      return this;
	    }
	  }]);
	
	  return AboutView;
	}(Backbone.View);
	
	exports.HomeView = HomeView;
	exports.AboutView = AboutView;
	exports.AddTaskView = AddTaskView;
	exports.TaskView = TaskView;
	exports.TasksView = TasksView;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Backbone = Backbone;
	var Model = _Backbone.Model;
	
	var TaskModel = function (_Model) {
	  _inherits(TaskModel, _Model);
	
	  function TaskModel() {
	    var _Object$getPrototypeO;
	
	    _classCallCheck(this, TaskModel);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TaskModel)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	  }
	
	  _createClass(TaskModel, [{
	    key: 'defaults',
	    value: function defaults() {
	      return {
	        title: 'unnamed',
	        sort: 10
	      };
	    }
	  }, {
	    key: 'validate',
	    value: function validate(attr) {
	      if (typeof attr.title === 'undefined' || !$.trim(attr.title)) {
	        return "Remember to set a title for your todo.";
	      }
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      this.on("invalid", function (model, error) {
	        console.log(error);
	      });
	    }
	  }]);
	
	  return TaskModel;
	}(Model);
	
	exports.default = TaskModel;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _model = __webpack_require__(3);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Backbone = Backbone;
	var Collection = _Backbone.Collection;
	
	var TaskCollection = function (_Collection) {
	  _inherits(TaskCollection, _Collection);
	
	  _createClass(TaskCollection, [{
	    key: 'model',
	    get: function get() {
	      return _model2.default;
	    }
	  }]);
	
	  function TaskCollection(options) {
	    _classCallCheck(this, TaskCollection);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TaskCollection).call(this, options));
	    //this.model = TaskModel;
	  }
	
	  return TaskCollection;
	}(Collection);
	
	exports.default = TaskCollection;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map