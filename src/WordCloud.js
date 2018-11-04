import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import { withFauxDOM } from 'react-faux-dom';

import { defaultFontSizeMapper } from './defaultMappers';

const fill = scaleOrdinal(schemeCategory10);

class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    font: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fontSizeMapper: PropTypes.func,
    onWordClick: PropTypes.func,
    onWordMouseOver: PropTypes.func,
    onWordMouseOut: PropTypes.func,
    rotate: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    connectFauxDOM: PropTypes.func.isRequired,
    animateFauxDOM: PropTypes.func.isRequired,
    animateDuration: PropTypes.number,
    chart: PropTypes.node.isRequired,
  };

  static defaultProps = {
    width: 700,
    height: 600,
    padding: 5,
    font: 'serif',
    fontSizeMapper: defaultFontSizeMapper,
    rotate: 0,
    animateDuration: 800,
    onWordClick: null,
    onWordMouseOver: null,
    onWordMouseOut: null,
  };

  componentDidMount() {
    this.renderWordCloud();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    // do not compare props.chart as it gets updated in renderWordCloud()
    // FIXME: when should we update it?
    if (data !== prevProps.data) {
      this.renderWordCloud();
    }
  }

  renderWordCloud() {
    const {
      data,
      width,
      height,
      padding,
      font,
      fontSizeMapper,
      rotate,
      animateDuration,
      onWordClick,
      onWordMouseOver,
      onWordMouseOut,

      // From withFauxDOM
      animateFauxDOM,
      connectFauxDOM,
    } = this.props;

    const faux = connectFauxDOM('div', 'chart');

    // render based on new data
    const layout = cloud()
      .size([width, height])
      .font(font)
      .words(data)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .on('end', words => {
        const texts = select(faux)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr(
            'transform',
            `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', font)
          .style('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);

        if (onWordClick) {
          texts.on('click', function(d, i) {
            onWordClick.call(this, d, i);
            animateFauxDOM(animateDuration);
          });
        }
        if (onWordMouseOver) {
          texts.on('mouseover', function(d, i) {
            onWordMouseOver.call(this, d, i);
            animateFauxDOM(animateDuration);
          });
        }
        if (onWordMouseOut) {
          texts.on('mouseout', function(d, i) {
            onWordMouseOut.call(this, d, i);
            animateFauxDOM(animateDuration);
          });
        }
      });

    layout.start();

    animateFauxDOM(animateDuration);
  }

  render() {
    const { chart } = this.props;

    return <div>{chart}</div>;
  }
}

export default withFauxDOM(WordCloud);
