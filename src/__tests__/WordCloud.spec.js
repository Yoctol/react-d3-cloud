import React from 'react';
import renderer from 'react-test-renderer';

import WordCloud from '../WordCloud';

describe('index.js', () => {
  const data = [
    { text: 'Hey', value: 1000 },
    { text: 'lol', value: 200 },
    { text: 'cool', value: 1 },
    { text: 'duck', value: 10 },
  ];

  it('should contain all words', () => {
    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0.5);
    const component = renderer.create(
      <WordCloud data={data} />
    ).toJSON();
    expect(component).toMatchSnapshot();
    Math.random = originalRandom;
  });

  it('should call custom fontSizeMapper', () => {
    const fontSizeMapper = jest.fn().mockReturnValue(10);
    renderer.create(
      <WordCloud data={data} fontSizeMapper={fontSizeMapper} />
    );
    expect(fontSizeMapper.mock.calls.length).toBe(data.length);
  });

  it('should call custom rotater', () => {
    const rotate = jest.fn().mockReturnValue(1);
    renderer.create(
      <WordCloud data={data} rotate={rotate} />
    );
    expect(rotate.mock.calls.length).toBe(data.length);
  });
});
