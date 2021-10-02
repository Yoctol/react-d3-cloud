import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

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
