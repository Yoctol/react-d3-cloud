import { Component, PropTypes } from 'react';
import ReactFauxDom from 'react-faux-dom';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const fill = d3.scaleOrdinal(d3.schemeCategory10);

class WordCloud extends Component {
  static defaultProps = {
    width: 700,
    height: 600,
    font: 'serif',
  }

  componentWillMount() {
    this.wordCloud = ReactFauxDom.createElement('div');
  }

  render() {
    const { data, width, height, font } = this.props;
    const wordCounts = data.map(
      text => ({ ...text })
    );
    const defaultFontSizeMapper = (word) => {
      const max = 100;
      const min = 10;
      const wordCountSize = wordCounts.map(w => w.value);
      const minSize = Math.min(...wordCountSize);
      const maxSize = Math.max(...wordCountSize);
      return min + (max - min) * (word.value - minSize) / (maxSize - minSize);
    };
    const layout = cloud()
      .size([width, height])
      .font(font)
      .words(wordCounts)
      .padding(5)
      .rotate(() => 0)
      .fontSize(defaultFontSizeMapper)
      .on('end', words => {
        d3.select(this.wordCloud)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', 'Impact')
          .style('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform',
            d => `translate(${[d.x, d.y]})rotate(${d.rotate})`
          )
          .text(d => d.text);
      });

    layout.start();

    return this.wordCloud.toReact();
  }
}

WordCloud.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  font: PropTypes.string,
};

export default WordCloud;
