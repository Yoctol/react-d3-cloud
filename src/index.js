import { Component, PropTypes } from 'react';
import ReactFauxDom from 'react-faux-dom';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const fill = d3.scaleOrdinal(d3.schemeCategory10);

class WordCloud extends Component {
  render() {
    const { data } = this.props;
    const wordCounts = Object.keys(data).map(
      key => ({ text: key, size: data[key], test: '123' })
    );
    const wordCloud = ReactFauxDom.createElement('div');
    const fontSizeMapper = (word) => {
      const max = 100;
      const min = 10;
      const wordCountSize = wordCounts.map(w => w.size);
      const minSize = Math.min(...wordCountSize);
      const maxSize = Math.max(...wordCountSize);
      return min + (max - min) * (word.size - minSize) / (maxSize - minSize);
    };
    const layout = cloud()
      .size([700, 600])
      .words(wordCounts)
      .padding(5)
      .rotate(() => 0)
      .fontSize(fontSizeMapper)
      .on('end', words => {
        d3.select(wordCloud)
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

    return wordCloud.toReact();
  }
}

WordCloud.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WordCloud;
