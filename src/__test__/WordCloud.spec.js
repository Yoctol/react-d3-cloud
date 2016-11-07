import React from 'react';
import renderer from 'react-test-renderer';

import WordCloud from '../WordCloud';

describe('index.js', () => {
  const data = {
    word1: 100,
    word2: 120,
  };
  it('should be a react component', () => {
    const component = renderer.create(
      <WordCloud data={data} />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
