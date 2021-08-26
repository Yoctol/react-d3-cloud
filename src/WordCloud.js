import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactFauxDom from 'react-faux-dom';
import cloud from 'd3-cloud';
import isDeepEqual from 'react-fast-compare';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';

// From: https://github.com/jasondavies/d3-cloud/blob/4fc1a943d01d270e7838c97bb8ee48ca15da20be/index.js#L355-L378
function archimedeanSpiral(size) {
  const e = size[0] / size[1];
  return (t) => {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
  };
}

function rectangularSpiral(size) {
  const dy = 4;
  const dx = (dy * size[0]) / size[1];
  let x = 0;
  let y = 0;
  return (t) => {
    const sign = t < 0 ? -1 : 1;
    // See triangular numbers: T_n = n * (n + 1) / 2.
    // eslint-disable-next-line no-bitwise
    switch ((Math.sqrt(1 + 4 * sign * t) - sign) & 3) {
      case 0:
        x += dx;
        break;
      case 1:
        y += dy;
        break;
      case 2:
        x -= dx;
        break;
      default:
        y -= dy;
        break;
    }
    return [x, y];
  };
}

const spirals = {
  archimedean: archimedeanSpiral,
  rectangular: rectangularSpiral,
};

function WordCloud(props) {
  const elementRef = useRef();

  if (!elementRef.current) {
    elementRef.current = ReactFauxDom.createElement('div');
  }

  const el = elementRef.current;

  const {
    data,
    width,
    height,
    font,
    fontStyle,
    fontWeight,
    fontSize,
    rotate,
    spiral,
    padding,
    random,
    fill,
    onWordClick,
    onWordMouseOver,
    onWordMouseOut,
  } = props;

  // clear old words
  select(el).selectAll('*').remove();

  // render based on new data
  const layout = cloud()
    .words(data)
    .size([width, height])
    .font(font)
    .fontStyle(fontStyle)
    .fontWeight(fontWeight)
    .fontSize(fontSize)
    .rotate(rotate)
    .spiral(
      typeof spiral === 'string'
        ? spirals[spiral] ?? spirals.archimedean
        : spiral
    )
    .padding(padding)
    .random(random)
    .on('end', (words) => {
      const [w, h] = layout.size();
      const texts = select(el)
        .append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${w / 2},${h / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-family', (d) => d.font)
        .style('font-style', (d) => d.style)
        .style('font-weight', (d) => d.weight)
        .style('font-size', (d) => `${d.size}px`)
        .style('fill', fill)
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text);

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

  return el.toReact();
}

WordCloud.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  font: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  fontStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  fontSize: PropTypes.func,
  rotate: PropTypes.func,
  spiral: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  random: PropTypes.func,
  fill: PropTypes.func,
  onWordClick: PropTypes.func,
  onWordMouseOut: PropTypes.func,
  onWordMouseOver: PropTypes.func,
};

WordCloud.defaultProps = {
  width: 700,
  height: 600,
  font: 'serif',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: (d) => Math.sqrt(d.value),
  // eslint-disable-next-line no-bitwise
  rotate: () => (~~(Math.random() * 6) - 3) * 30,
  spiral: 'archimedean',
  padding: 1,
  random: Math.random,
  fill: (d, i) => scaleOrdinal(schemeCategory10)(i),
  onWordClick: null,
  onWordMouseOver: null,
  onWordMouseOut: null,
};

export default React.memo(WordCloud, isDeepEqual);
