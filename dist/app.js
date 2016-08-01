'use strict';

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function Application() {
  _classCallCheck(this, Application);

  new _router2.default();
  Backbone.history.start();
};

$(function () {
  new Application();
});