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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esnext:true */
	
	var _library = __webpack_require__(2);
	
	var _library2 = _interopRequireDefault(_library);
	
	var _library3 = __webpack_require__(4);
	
	var _library4 = _interopRequireDefault(_library3);
	
	var _book = __webpack_require__(3);
	
	var _book2 = _interopRequireDefault(_book);
	
	__webpack_require__(7);
	
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
	
	      $('#releaseDate').datepicker();
	      new _library4.default();
	    }
	  }]);
	
	  return Application;
	}();
	
	// Load the application once the DOM is ready, using `jQuery.ready`
	
	
	$(function () {
	  new Application();
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _book = __webpack_require__(3);
	
	var _book2 = _interopRequireDefault(_book);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Backbone = Backbone;
	var Collection = _Backbone.Collection;
	var LocalStorage = _Backbone.LocalStorage;
	
	var Library = function (_Collection) {
	  _inherits(Library, _Collection);
	
	  function Library(options) {
	    _classCallCheck(this, Library);
	
	    // Hold a reference to this collection's model.
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Library).call(this, options));
	
	    _this.model = _book2.default;
	
	    _this.url = '/api/books';
	
	    // Save all of the todo items under the `'todos'` namespace.
	    //this.localStorage = new LocalStorage('backbone-todomvc-es6');
	    return _this;
	  }
	
	  return Library;
	}(Collection);
	
	exports.default = Library;

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
	
	var Book = function (_Model) {
	  _inherits(Book, _Model);
	
	  function Book() {
	    var _Object$getPrototypeO;
	
	    _classCallCheck(this, Book);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Book)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	  }
	
	  // Define some default attributes for the todo.
	
	
	  _createClass(Book, [{
	    key: 'defaults',
	    value: function defaults() {
	      return {
	        coverImage: 'i/placeholder.jpg',
	        title: 'No title',
	        author: 'Unknown',
	        releaseDate: '',
	        keywords: []
	      };
	    }
	  }, {
	    key: 'parse',
	    value: function parse(response) {
	      response.id = response._id;
	      return response;
	    }
	  }]);
	
	  return Book;
	}(Model);
	
	exports.default = Book;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _book = __webpack_require__(5);
	
	var _book2 = _interopRequireDefault(_book);
	
	var _book3 = __webpack_require__(3);
	
	var _book4 = _interopRequireDefault(_book3);
	
	var _library = __webpack_require__(2);
	
	var _library2 = _interopRequireDefault(_library);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esnext:true */
	
	var _Backbone = Backbone;
	var View = _Backbone.View;
	
	var LibraryView = function (_View) {
	  _inherits(LibraryView, _View);
	
	  function LibraryView(options) {
	    _classCallCheck(this, LibraryView);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LibraryView).call(this, options));
	  }
	
	  _createClass(LibraryView, [{
	    key: 'initialize',
	    value: function initialize(initialBooks) {
	
	      this.collection = new _library2.default();
	      this.collection.fetch({ reset: true });
	
	      this.render();
	
	      this.listenTo(this.collection, 'add', this.renderBook);
	      this.listenTo(this.collection, 'reset', this.render);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      this.collection.each(function (item) {
	        return _this2.renderBook(item);
	      });
	      return this;
	    }
	
	    // отображение библиотеки посредством вывода каждой книги из коллекции
	
	  }, {
	    key: 'renderBook',
	    value: function renderBook(item) {
	      var bookView = new _book2.default({
	        model: item
	      });
	
	      this.$el.append(bookView.render().el);
	    }
	  }, {
	    key: 'addBook',
	    value: function addBook(e) {
	      e.preventDefault();
	      var formData = {};
	
	      $('#addBook div').children('input').each(function (i, el) {
	        if ($(el).val() != '') {
	
	          if (el.id === 'keywords') {
	            formData[el.id] = [];
	            _.each($(el).val().split(' '), function (keyword) {
	              formData[el.id].push({ 'keyword': keyword });
	            });
	          } else if (el.id === 'releaseDate') {
	            formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
	          } else {
	            formData[el.id] = $(el).val();
	          }
	
	          $(el).val('');
	        }
	      });
	
	      //this.collection.add( new Book(formData) );
	      this.collection.create(formData);
	    }
	  }, {
	    key: 'el',
	    get: function get() {
	      return '#books';
	    }
	  }, {
	    key: 'events',
	    get: function get() {
	      return {
	        'click #add': 'addBook'
	      };
	    }
	  }]);
	
	  return LibraryView;
	}(View);
	
	exports.default = LibraryView;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _book = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*jshint esnext:true */
	
	//import Cache from './../helpers/cache';
	
	var _Backbone = Backbone;
	var View = _Backbone.View;
	
	// BookView class
	
	var BookView = function (_View) {
	  _inherits(BookView, _View);
	
	  _createClass(BookView, [{
	    key: 'tagName',
	    get: function get() {
	      return 'div';
	    }
	  }, {
	    key: 'className',
	    get: function get() {
	      return 'bookContainer';
	    }
	  }]);
	
	  function BookView(options) {
	    _classCallCheck(this, BookView);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BookView).call(this, options));
	
	    _this.template = _.template(_book.template);
	    //this.template = _.template( $('#bookTemplate').html() );
	    return _this;
	  }
	
	  _createClass(BookView, [{
	    key: 'initialize',
	    value: function initialize() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      this.$el.html(this.template(this.model.toJSON()));
	      return this;
	    }
	  }, {
	    key: 'deleteBook',
	    value: function deleteBook() {
	      this.model.destroy();
	      this.remove();
	    }
	  }, {
	    key: 'events',
	    get: function get() {
	      return {
	        'click .delete': 'deleteBook'
	      };
	    }
	  }]);
	
	  return BookView;
	}(View);
	
	exports.default = BookView;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var template = exports.template = "\n    <img src=\"<%= coverImage %>\"/>\n    <ul>\n    <li><%= title %></li>\n    <li><%= author %></li>\n    <li><%=  $.format.date( new Date( releaseDate ), 'MMMM yyyy' ) %></li>\n    <li>\n      <% _.each( keywords, function( keyobj ) {%>\n        <%= keyobj.keyword %><% \n      } ); %>\n    </li>\n    </ul>\n    <button class=\"delete\">Delete</button>\n  ";

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map