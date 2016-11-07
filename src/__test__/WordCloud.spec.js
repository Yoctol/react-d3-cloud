
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
});
