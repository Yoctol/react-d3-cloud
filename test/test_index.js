import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import WordCloud from '../src';

describe('index.js', () => {
  const data = {
    word1: 100,
    word2: 120,
  };
  it('should be a react component', () => {
    const component = mount(<WordCloud data={data} />);
    expect(component).to.be.present();
  });
});
