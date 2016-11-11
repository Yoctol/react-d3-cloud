# react-d3-cloud

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][david_img]][david_site]

A word cloud react component using d3-cloud

## usage
```
npm install react-d3-cloud
```

```jsx
import WordCloud from 'react-d3-cloud'

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'cool', value: 1 },
  { text: 'duck', value: 10 },
]

const fontSizeMapper = word => word.value * 2;

<WordCloud data={data} fontSizeMapper={fontSizeMapper} />
```

## example
![image](https://cloud.githubusercontent.com/assets/6868283/20204452/ac873c54-a80a-11e6-8872-252efc0c15da.png)
There will be a official gh-pages demo in the next 2 releases.

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


