'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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