import PropTypes from 'prop-types';
import ReactFauxDom from 'react-faux-dom';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import { useRef } from 'react';

const fill = scaleOrdinal(schemeCategory10);

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
    .spiral(spiral)
    .padding(padding)
    .random(random)
    .on('end', (words) => {
      const texts = select(el)
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
        .style('font-size', (d) => `${d.size}px`)
        .style('font-family', font)
        .style('fill', (d, i) => fill(i))
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
  onWordClick: null,
  onWordMouseOver: null,
  onWordMouseOut: null,
};

export default WordCloud;
