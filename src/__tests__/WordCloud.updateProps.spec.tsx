import React from 'react';
import { shallow } from 'enzyme';

import WordCloud from '../WordCloud';

const data = [
  { text: 'Hey', value: 100 },
  { text: 'lol', value: 200 },
  { text: 'cool', value: 1 },
  { text: 'duck', value: 10 },
];

it('should render correct number of words', () => {
  const component = shallow(<WordCloud data={data} />);
  expect(component.find('g').children().length).toBe(4);
});

it('should render correct number of words after re-render', () => {
  const component = shallow(<WordCloud data={data} />);
  const newData = [
    { text: 'Hey', value: 101 },
    { text: 'lol', value: 199 },
    { text: 'cool', value: 2 },
    { text: 'duck', value: 30 },
    { text: 'crazy', value: 60 },
  ];
  component.setProps({ data: newData });
  expect(component.find('g').children().length).toBe(5);
});
