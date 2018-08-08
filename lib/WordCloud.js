'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _d3Selection = require('d3-selection');

var _d3Scale = require('d3-scale');

var _d3Cloud = require('d3-cloud');

var _d3Cloud2 = _interopRequireDefault(_d3Cloud);

var _defaultMappers = require('./defaultMappers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ordinalScale = (0, _d3Scale.scaleOrdinal)(_d3Scale.schemeCategory10);
var defaultFillMapper = function defaultFillMapper(d, i) {
  return ordinalScale(i);
};

var defaultClickEvent = function defaultClickEvent(word) {};

var WordCloud = function (_Component) {
  _inherits(WordCloud, _Component);

  function WordCloud() {
    _classCallCheck(this, WordCloud);

    return _possibleConstructorReturn(this, (WordCloud.__proto__ || Object.getPrototypeOf(WordCloud)).apply(this, arguments));
  }

  _createClass(WordCloud, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.wordCloud = _reactFauxDom2.default.createElement('div');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          width = _props.width,
          height = _props.height,
          padding = _props.padding,
          font = _props.font,
          fontSizeMapper = _props.fontSizeMapper,
          fontFillMapper = _props.fontFillMapper,
          rotate = _props.rotate,
          onWordClick = _props.onWordClick;

      var wordCounts = data.map(function (text) {
        return _extends({}, text);
      });

      // clear old words
      (0, _d3Selection.select)(this.wordCloud).selectAll('*').remove();

      // render based on new data
      var layout = (0, _d3Cloud2.default)().size([width, height]).font(font).words(wordCounts).padding(padding).rotate(rotate).fontSize(fontSizeMapper).on('end', function (words) {
        (0, _d3Selection.select)(_this2.wordCloud).append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')').selectAll('text').data(words).enter().append('text').style('font-size', function (d) {
          return d.size + 'px';
        }).style('font-family', font).style('fill', fontFillMapper).attr('text-anchor', 'middle').attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        }).text(function (d) {
          return d.text;
        }).on('click', function (d) {
          return onWordClick(d);
        });
      });

      layout.start();

      return this.wordCloud.toReact();
    }
  }]);

  return WordCloud;
}(_react.Component);

WordCloud.defaultProps = {
  width: 700,
  height: 600,
  padding: 5,
  font: 'serif',
  fontSizeMapper: _defaultMappers.defaultFontSizeMapper,
  fontFillMapper: defaultFillMapper,
  rotate: 0,
  onWordClick: defaultClickEvent
};
exports.default = WordCloud;