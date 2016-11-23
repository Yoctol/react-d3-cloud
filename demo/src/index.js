import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

import data from '../../hello.json';

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

render(
  <WordCloud
    data={data}
    fontSizeMapper={fontSizeMapper}
    rotate={rotate}
  />,
  document.getElementById('root')
);
