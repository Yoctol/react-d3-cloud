# react-d3-cloud

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]

A word cloud react component built with [d3-cloud](https://github.com/jasondavies/d3-cloud).

![image](https://cloud.githubusercontent.com/assets/6868283/20619528/fa83334c-b32f-11e6-81dd-6fe4fa6c52d9.png)

## Usage

```sh
npm install react-d3-cloud
```

```jsx
import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
];

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
```

Please checkout [demo](https://yoctol.github.com/react-d3-cloud)

for more detailed props, please refer to below:


## Props

name | description | type | required | default
-----|-------------|------|----------|--------
data | The input data for rendering | Array<{ text: string, value: number }>  | ✓ |
width | Width of component (px) | number | | 700
height | Height of component (px) | number | | 600
fontSizeMapper | Map each element of `data` to font size (px) | Function: `(word: string, idx: number): number` | | `word => word.value;`
rotate | Map each element of `data` to font rotation degree. Or simply provide a number for global rotation. (degree) | Function \| number | | 0
padding | Map each element of `data` to font padding. Or simply provide a number for global padding. (px) | Function \| number | | 5
font | The font of text shown | Function \| string | | serif
onWordClick | Function called when clicking in a word | Function: `word => onWordClick(word)` | | `console.log(word)`


## Build

```sh
npm run build
```

## Test

### pre-install

#### Mac OS X

```sh
brew install pkg-config cairo pango libpng jpeg giflib librsvg
npm install
```

#### Ubuntu and other Debian based systems

```sh
sudo apt-get update
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
npm install
```

For more details, please check out [Installation guides](https://github.com/Automattic/node-canvas/wiki) at node-canvas wiki.

### Run test

```sh
npm test
```

## License

MIT © [Yoctol](https://github.com/Yoctol/react-d3-cloud)

[npm-image]: https://img.shields.io/npm/v/react-d3-cloud.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-d3-cloud
[travis-image]: https://travis-ci.org/Yoctol/react-d3-cloud.svg?branch=master
[travis-url]: https://travis-ci.org/Yoctol/react-d3-cloud
[david_img]: https://david-dm.org/Yoctol/react-d3-cloud.svg
[david_site]: https://david-dm.org/Yoctol/react-d3-cloud
