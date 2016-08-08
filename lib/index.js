'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _d3Cloud = require('d3-cloud');

var _d3Cloud2 = _interopRequireDefault(_d3Cloud);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fill = d3.scaleOrdinal(d3.schemeCategory10);

var WordCloud = function (_Component) {
  _inherits(WordCloud, _Component);

  function WordCloud() {
    _classCallCheck(this, WordCloud);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WordCloud).apply(this, arguments));
  }

  _createClass(WordCloud, [{
    key: 'render',
    value: function render() {
      var data = this.props.data;

      var wordCounts = Object.keys(data).map(function (key) {
        return { text: key, size: data[key], test: '123' };
      });
      var wordCloud = _reactFauxDom2.default.createElement('div');
      var fontSizeMapper = function fontSizeMapper(word) {
        var max = 100;
        var min = 10;
        var wordCountSize = wordCounts.map(function (w) {
          return w.size;
        });
        var minSize = Math.min.apply(Math, _toConsumableArray(wordCountSize));
        var maxSize = Math.max.apply(Math, _toConsumableArray(wordCountSize));
        return min + (max - min) * (word.size - minSize) / (maxSize - minSize);
      };
      var layout = (0, _d3Cloud2.default)().size([700, 600]).words(wordCounts).padding(5).rotate(function () {
        return 0;
      }).fontSize(fontSizeMapper).on('end', function (words) {
        d3.select(wordCloud).append('svg').attr('width', layout.size()[0]).attr('height', layout.size()[1]).append('g').attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')').selectAll('text').data(words).enter().append('text').style('font-size', function (d) {
          return d.size + 'px';
        }).style('font-family', 'Impact').style('fill', function (d, i) {
          return fill(i);
        }).attr('text-anchor', 'middle').attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        }).text(function (d) {
          return d.text;
        });
      });

      layout.start();

      return wordCloud.toReact();
    }
  }]);

  return WordCloud;
}(_react.Component);

exports.default = WordCloud;