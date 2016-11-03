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

const data = {
  word1: 100,
  word2: 200,
}

<WordCloud data={data} />
```

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


