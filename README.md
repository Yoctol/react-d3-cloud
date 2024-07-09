# react-d3-cloud

[![npm version](https://badge.fury.io/js/react-d3-cloud.svg)](https://badge.fury.io/js/react-d3-cloud)
[![Build Status](https://github.com/Yoctol/react-d3-cloud/workflows/CI/badge.svg?branch=master)](https://github.com/Yoctol/react-d3-cloud/actions?query=branch%3Amaster)

A word cloud react component built with [d3-cloud](https://github.com/jasondavies/d3-cloud).

![image](https://cloud.githubusercontent.com/assets/6868283/20619528/fa83334c-b32f-11e6-81dd-6fe4fa6c52d9.png)

## Installation

```sh
npm install react-d3-cloud
```

## Usage

Simple:

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

render(<WordCloud data={data} />, document.getElementById('root'));
```

More configuration:

```jsx
import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
];

const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

render(
  <WordCloud
    data={data}
    width={500}
    height={500}
    font="Times"
    fontStyle="italic"
    fontWeight="bold"
    fontSize={(word) => Math.log2(word.value) * 5}
    spiral="rectangular"
    rotate={(word) => word.value % 360}
    padding={5}
    random={Math.random}
    fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
    onWordClick={(event, d) => {
      console.log(`onWordClick: ${d.text}`);
    }}
    onWordMouseOver={(event, d) => {
      console.log(`onWordMouseOver: ${d.text}`);
    }}
    onWordMouseOut={(event, d) => {
      console.log(`onWordMouseOut: ${d.text}`);
    }}
  />,
  document.getElementById('root')
);
```

Please checkout [demo](https://codesandbox.io/embed/react-d3-cloud-demo-forked-50wzl)

for more detailed props, please refer to below:

## Props

| name            | description                                                                                                                                                                                                              | type                                                                 | required | default                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------- | ------------------------------------------- |
| data            | The words array                                                                                                                                                                                                          | `{ text: string, value: number }>[]`                                 | ✓        |
| width           | Width of the layout (px)                                                                                                                                                                                                 | `number`                                                             |          | `700`                                       |
| height          | Height of the layout (px)                                                                                                                                                                                                | `number`                                                             |          | `600`                                       |
| timeInterval    | The maximum amount of time that can be spent during the current timestep (ms). Prevents the layout from getting stuck.                                                                                                   | `number`                                                             |          | `Infinity`                                  |
| font            | The font accessor function, which indicates the font face for each word. A constant may be specified instead of a function.                                                                                              | `string \| (d) => string`                                            |          | `'serif'`                                   |
| fontStyle       | The fontStyle accessor function, which indicates the font style for each word. A constant may be specified instead of a function.                                                                                        | `string \| (d) => string`                                            |          | `'normal'`                                  |
| fontWeight      | The fontWeight accessor function, which indicates the font weight for each word. A constant may be specified instead of a function.                                                                                      | `string \| number \| (d) => string \| number`                        |          | `'normal'`                                  |
| fontSize        | The fontSize accessor function, which indicates the numerical font size for each word.                                                                                                                                   | `(d) => number`                                                      |          | `(d) => Math.sqrt(d.value)`                 |
| rotate          | The rotate accessor function, which indicates the rotation angle (in degrees) for each word.                                                                                                                             | `(d) => number`                                                      |          | `() => (~~(Math.random() * 6) - 3) * 30`    |
| spiral          | The current type of spiral used for positioning words. This can either be one of the two built-in spirals, "archimedean" and "rectangular", or an arbitrary spiral generator can be used                                 | `'archimedean' \| 'rectangular' \| ([width, height]) => t => [x, y]` |          | `'archimedean'`                             |
| padding         | The padding accessor function, which indicates the numerical padding for each word.                                                                                                                                      | `number \| (d) => number`                                            |          | `1`                                         |
| random          | The internal random number generator, used for selecting the initial position of each word, and the clockwise/counterclockwise direction of the spiral for each word. This should return a number in the range `[0, 1)`. | `(d) => number`                                                      |          | `Math.random`                               |
| fill            | The fill accessor function, which indicates the color for each word.                                                                                                                                                     | `(d, i) => string`                                                   |          | `(d, i) => schemeCategory10ScaleOrdinal(i)` |
| onWordClick     | The function will be called when `click` event is triggered on a word                                                                                                                                                    | `(event, d) => {}`                                                   |          | null                                        |
| onWordMouseOver | The function will be called when `mouseover` event is triggered on a word                                                                                                                                                | `(event, d) => {}`                                                   |          | null                                        |
| onWordMouseOut  | The function will be called when `mouseout` event is triggered on a word                                                                                                                                                 | `(event, d) => {}`                                                   |          | null                                        |

## FAQ

### How to Use with Next.js/SSR

To make `<WordCloud />` work with Server-Side Rendering (SSR), you need to avoid rendering it on the server:

```js
{
  typeof window !== 'undefined' && <WordCloud data={data} />;
}
```

### How to Avoid Unnecessary Re-render

As of version 0.10.1, `<WordCloud />` has been wrapped by `React.memo()` and deep equal comparison under the hood to avoid unnecessary re-render. All you need to do is to make your function props deep equal comparable using `useCallback()`:

```js
import React, { useCallback } from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

function App() {
  const data = [
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'first impression', value: 800 },
    { text: 'very cool', value: 1000000 },
    { text: 'duck', value: 10 },
  ];

  const fontSize = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate = useCallback((word) => word.value % 360, []);
  const fill = useCallback((d, i) => scaleOrdinal(schemeCategory10)(i), []);
  const onWordClick = useCallback((word) => {
    console.log(`onWordClick: ${word}`);
  }, []);
  const onWordMouseOver = useCallback((word) => {
    console.log(`onWordMouseOver: ${word}`);
  }, []);
  const onWordMouseOut = useCallback((word) => {
    console.log(`onWordMouseOut: ${word}`);
  }, []);

  return (
    <WordCloud
      data={data}
      width={500}
      height={500}
      font="Times"
      fontStyle="italic"
      fontWeight="bold"
      fontSize={fontSize}
      spiral="rectangular"
      rotate={rotate}
      padding={5}
      random={Math.random}
      fill={fill}
      onWordClick={onWordClick}
      onWordMouseOver={onWordMouseOver}
      onWordMouseOut={onWordMouseOut}
    />
  );
);
```

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

#### Ubuntu and Other Debian Based Systems

```sh
sudo apt-get update
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
npm install
```

For more details, please check out [Installation guides](https://github.com/Automattic/node-canvas/wiki) at node-canvas wiki.

### Run Tests

```sh
npm test
```

## License

MIT © [Yoctol](https://github.com/Yoctol/react-d3-cloud)
