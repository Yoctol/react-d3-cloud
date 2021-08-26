# react-d3-cloud

[![npm version](https://badge.fury.io/js/react-d3-cloud.svg)](https://badge.fury.io/js/react-d3-cloud)
[![Build Status](https://github.com/Yoctol/react-d3-cloud/workflows/CI/badge.svg?branch=master)](https://github.com/Yoctol/react-d3-cloud/actions?query=branch%3Amaster)

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

const fontSize = (word) => Math.log2(word.value) * 5;
const rotate = (word) => word.value % 360;

render(
  <WordCloud data={data} fontSize={fontSize} rotate={rotate} />,
  document.getElementById('root')
);
```

Please checkout [demo](https://yoctol.github.io/react-d3-cloud)

for more detailed props, please refer to below:

## Props

| name               | description                                                                                                                                                                                                              | type                                         | required | default                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- | -------- | ---------------------------------------- |
| data               | The words array                                                                                                                                                                                                          | `{ text: string, value: number }>[]`         | ✓        |
| width              | Width of the layout (px)                                                                                                                                                                                                 | `number`                                     |          | `700`                                    |
| height             | Height of the layout (px)                                                                                                                                                                                                | `number`                                     |          | `600`                                    |
| font               | The font accessor function, which indicates the font face for each word. A constant may be specified instead of a function.                                                                                              | `string \| (d) => string`                    |          | `'serif'`                                |
| fontStyle          | The fontStyle accessor function, which indicates the font style for each word. A constant may be specified instead of a function.                                                                                        | `string \| (d) => string`                    |          | `'normal'`                               |
| fontWeight         | The fontWeight accessor function, which indicates the font weight for each word. A constant may be specified instead of a function.                                                                                      | `string \| (d) => string`                    |          | `'normal'`                               |
| fontSize           | The fontSize accessor function, which indicates the numerical font size for each word.                                                                                                                                   | `(d) => number`                              |          | `(d) => Math.sqrt(d.value)`              |
| rotate             | The rotate accessor function, which indicates the rotation angle (in degrees) for each word.                                                                                                                             | `(d) => number`                              |          | `() => (~~(Math.random() * 6) - 3) * 30` |
| spiral             | The current type of spiral used for positioning words. This can either be one of the two built-in spirals, "archimedean" and "rectangular", or an arbitrary spiral generator can be used                                 | `string \| ([width, height]) => t => [x, y]` |          | `'archimedean'`                          |
| padding            | The padding accessor function, which indicates the numerical padding for each word.                                                                                                                                      | `number \| (d) => number`                    |          | `1`                                      |
| random             | The internal random number generator, used for selecting the initial position of each word, and the clockwise/counterclockwise direction of the spiral for each word. This should return a number in the range `[0, 1)`. | `(d) => number`                              |          | `Math.random`                            |
| onWordClick        | The function will be called when `click` event is triggered on a word                                                                                                                                                    | `word => {}`                                 |          | null                                     |
| onWorwordMouseOver | The function will be called when `mouseover` event is triggered on a word                                                                                                                                                | `word => {}`                                 |          | null                                     |
| onWordMouseOut     | The function will be called when `mouseout` event is triggered on a word                                                                                                                                                 | `word => {}`                                 |          | null                                     |

## Next.js/SSR

To make `<WordCloud />` work with Server-Side Rendering (SSR), you need to avoid rendering it on the server:

```js
{
  typeof window !== 'undefiend' && <WordCloud data={data} />;
}
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
