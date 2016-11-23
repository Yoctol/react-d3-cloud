# react-d3-cloud

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]

A word cloud react component using [d3-cloud](https://github.com/jasondavies/d3-cloud).

## usage
```
npm install react-d3-cloud
```

```jsx
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
```

Please checkout [demo](https://yoctol.github.com/react-d3-cloud)

for more detailed props, please refer to below:


## Props

name | description | type | default
-----|-------------|------|--------
data|the input data for rendering|Array, each element should have shape: `{ text: String, value: Number}`|N/A, should be provided
width|width of component(px) |number|700
height|height of component(px)|number|600
fontSizeMapper|map each element of `data` to font size(px)|function: `(word, idx) => {return number}`|`word => word.value;`
rotate|Map each element of `data` to font rotation degree. Or simply provide a number for global rotation.(degree)|function or number|0
padding|Map each element of `data` to font padding. Or simply provide a number for global padding.(px)|function or number|5
font|the font of text shown|function or string|serif


## build
```
npm run build
```

## Test

### pre-install
```
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
npm install
```

### Run test
```
npm test
```

[npm-image]: https://img.shields.io/npm/v/react-d3-cloud.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-d3-cloud
[travis-image]: https://travis-ci.org/Yoctol/react-d3-cloud.svg?branch=master
[travis-url]: https://travis-ci.org/Yoctol/react-d3-cloud
[david_img]: https://david-dm.org/Yoctol/react-d3-cloud.svg
[david_site]: https://david-dm.org/Yoctol/react-d3-cloud


