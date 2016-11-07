
import React from 'react';
import renderer from 'react-test-renderer';

import WordCloud from '../WordCloud';

describe('index.js', () => {
  const data = {
    word1: 100,
    word2: 120,
  };
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
