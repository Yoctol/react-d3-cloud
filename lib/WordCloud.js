"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFauxDom = _interopRequireDefault(require("react-faux-dom"));

var _d3Cloud = _interopRequireDefault(require("d3-cloud"));

var _react = require("react");

var _d3Scale = require("d3-scale");

var _d3ScaleChromatic = require("d3-scale-chromatic");

var _d3Selection = require("d3-selection");

var _defaultMappers = require("./defaultMappers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ordinalScale = (0, _d3Scale.scaleOrdinal)(_d3ScaleChromatic.schemeCategory10);

var defaultFillMapper = function defaultFillMapper(d, i) {
  return ordinalScale(i);
};

var WordCloud =
/*#__PURE__*/
function (_Component) {
  _inherits(WordCloud, _Component);

  function WordCloud() {
    _classCallCheck(this, WordCloud);

    return _possibleConstructorReturn(this, _getPrototypeOf(WordCloud).apply(this, arguments));
  }

  _createClass(WordCloud, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.wordCloud = _reactFauxDom.default.createElement('div');
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          data = _this$props.data,
          width = _this$props.width,
          height = _this$props.height,
          padding = _this$props.padding,
          font = _this$props.font,
          fontSizeMapper = _this$props.fontSizeMapper,
          fontFillMapper = _this$props.fontFillMapper,
          rotate = _this$props.rotate,
          onWordClick = _this$props.onWordClick,
          onWordMouseOver = _this$props.onWordMouseOver,
          onWordMouseOut = _this$props.onWordMouseOut; // clear old words

      (0, _d3Selection.select)(this.wordCloud).selectAll('*').remove(); // render based on new data

      var layout = (0, _d3Cloud.default)().size([width, height]).font(font).words(data).padding(padding).rotate(rotate).fontSize(fontSizeMapper).on('end', function (words) {
        var texts = (0, _d3Selection.select)(_this.wordCloud).append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', "translate(".concat(layout.size()[0] / 2, ",").concat(layout.size()[1] / 2, ")")).selectAll('text').data(words).enter().append('text').style('font-size', function (d) {
          return "".concat(d.size, "px");
        }).style('font-family', font).style('fill', fontFillMapper).attr('text-anchor', 'middle').attr('transform', function (d) {
          return "translate(".concat([d.x, d.y], ")rotate(").concat(d.rotate, ")");
        }).text(function (d) {
          return d.text;
        });

        if (onWordClick) {
          texts.on('click', onWordClick);
        }

        if (onWordMouseOver) {
          texts.on('mouseover', onWordMouseOver);
        }

        if (onWordMouseOut) {
          texts.on('mouseout', onWordMouseOut);
        }
      });
      layout.start();
      return this.wordCloud.toReact();
    }
  }]);

  return WordCloud;
}(_react.Component);

_defineProperty(WordCloud, "propTypes", {
  data: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.string.isRequired,
    value: _propTypes.default.number.isRequired
  })).isRequired,
  font: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  fontFillMapper: _propTypes.default.func,
  fontSizeMapper: _propTypes.default.func,
  height: _propTypes.default.number,
  padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  rotate: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.func]),
  width: _propTypes.default.number,
  onWordClick: _propTypes.default.func,
  onWordMouseOut: _propTypes.default.func,
  onWordMouseOver: _propTypes.default.func
});

_defineProperty(WordCloud, "defaultProps", {
  width: 700,
  height: 600,
  padding: 5,
  font: 'serif',
  fontSizeMapper: _defaultMappers.defaultFontSizeMapper,
  fontFillMapper: defaultFillMapper,
  rotate: 0,
  onWordClick: null,
  onWordMouseOver: null,
  onWordMouseOut: null
});

var _default = WordCloud;
exports.default = _default;