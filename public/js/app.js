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
	
	var _sticker = __webpack_require__(6);
	
	var _sticker2 = _interopRequireDefault(_sticker);
	
	__webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sticker = new _sticker2.default({ title: 'lalala' }); /*jshint esnext:true */
	
	console.log(sticker.toJSON());
	
	/*
	import Library      from './collections/library';
	import LibraryView  from './views/library';
	import Book         from './models/book';

	class Application {
	  constructor () {
	    this.init();
	  }

	  init() {

	    $('#releaseDate').datepicker();
	    new LibraryView(); 
	  }
	}

	// Load the application once the DOM is ready, using `jQuery.ready`
	$(() => {
	  new Application();
	});*/

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
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
	
	var Sticker = function (_Model) {
	  _inherits(Sticker, _Model);
	
	  function Sticker() {
	    var _Object$getPrototypeO;
	
	    _classCallCheck(this, Sticker);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Sticker)).call.apply(_Object$getPrototypeO, [this].concat(args)));
	  }
	
	  // Define default attributes.
	
	
	  _createClass(Sticker, [{
	    key: 'defaults',
	    value: function defaults() {
	      return {
	        title: 'No title',
	        description: 'Unknown',
	        liked: false,
	        created: 0
	      };
	    }
	  }, {
	    key: 'parse',
	    value: function parse(response) {
	      response.id = response._id;
	      return response;
	    }
	  }, {
	    key: 'isLiked',
	    value: function isLiked() {
	      return this.get('liked');
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      return this.set('liked', !this.isLiked());
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      if (this.isNew()) {
	        this.set('created', Date.now());
	      }
	    }
	  }]);
	
	  return Sticker;
	}(Model);
	
	exports.default = Sticker;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map