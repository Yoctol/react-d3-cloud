import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

import data from '../../hello.json';

const fontSizeMapper = word => word.value / 20;
const rotate = word => (word.value % 90) - 45;

class WordCloudDemo extends React.Component {
  render() {
    const newData = data.map(item => ({
      text: item.text,
      value: Math.random() * 1000,
    }));
    return (
      <WordCloud
        width={1000}
        height={750}
        data={newData}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        padding={2}
      />
    );
  }
}

render(
  <WordCloudDemo />,
  document.getElementById('root')
);
