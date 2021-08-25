import React from 'react';
import renderer from 'react-test-renderer';

import WordCloud from '../WordCloud';

const data = [
  { text: 'Hey', value: 100 },
  { text: 'lol', value: 200 },
  { text: 'cool', value: 1 },
  { text: 'duck', value: 10 },
];

it('should call custom fontSize', () => {
  const fontSize = jest.fn().mockReturnValue(10);
  renderer.create(<WordCloud data={data} fontSize={fontSize} />);
  expect(fontSize).toHaveBeenCalledTimes(data.length);
});

it('should call custom rotate', () => {
  const rotate = jest.fn().mockReturnValue(1);
  renderer.create(<WordCloud data={data} rotate={rotate} />);
  expect(rotate).toHaveBeenCalledTimes(data.length);
});
