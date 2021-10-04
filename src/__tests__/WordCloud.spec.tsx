import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import WordCloud, { Word } from '../WordCloud';

const data = [
  { text: 'Hey', value: 1 },
  { text: 'Ok', value: 5 },
  { text: 'Cool', value: 10 },
];

it('should render words', async () => {
  render(<WordCloud data={data} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toBeInTheDocument();
  expect(screen.getByText('Ok')).toBeInTheDocument();
  expect(screen.getByText('Cool')).toBeInTheDocument();
});

it('should render correct words after re-render', async () => {
  const { rerender } = render(<WordCloud data={data} />);

  const newData = [
    { text: 'New', value: 1 },
    { text: 'World', value: 5 },
  ];
  rerender(<WordCloud data={newData} />);

  await waitFor(() => screen.getByText('New'));

  expect(screen.queryByText('Hey')).not.toBeInTheDocument();
  expect(screen.queryByText('Ok')).not.toBeInTheDocument();
  expect(screen.queryByText('Cool')).not.toBeInTheDocument();

  expect(screen.getByText('New')).toBeInTheDocument();
  expect(screen.getByText('World')).toBeInTheDocument();
});

it('should render with custom font', async () => {
  const font = 'sans-serif';

  render(<WordCloud data={data} font={font} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toHaveStyle('font-family: sans-serif');
  expect(screen.getByText('Ok')).toHaveStyle('font-family: sans-serif');
  expect(screen.getByText('Cool')).toHaveStyle('font-family: sans-serif');
});

it('should render with custom fontStyle', async () => {
  const fontStyle = 'bold';

  render(<WordCloud data={data} fontStyle={fontStyle} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toHaveStyle('font-style: bold');
  expect(screen.getByText('Ok')).toHaveStyle('font-style: bold');
  expect(screen.getByText('Cool')).toHaveStyle('font-style: bold');
});

it('should render with custom fontWeight', async () => {
  const fontWeight = 900;

  render(<WordCloud data={data} fontWeight={fontWeight} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toHaveStyle('font-weight: 900');
  expect(screen.getByText('Ok')).toHaveStyle('font-weight: 900');
  expect(screen.getByText('Cool')).toHaveStyle('font-weight: 900');
});

it('should render with custom fontSize', async () => {
  const fontSize = (d: Word) => d.value * 2;

  render(<WordCloud data={data} fontSize={fontSize} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toHaveStyle('font-size: 2px');
  expect(screen.getByText('Ok')).toHaveStyle('font-size: 10px');
  expect(screen.getByText('Cool')).toHaveStyle('font-size: 20px');
});

it('should render with custom rotate', async () => {
  const rotate = (_: Word, i: number) => (i + 1) * 30;

  render(<WordCloud data={data} rotate={rotate} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toHaveAttribute(
    'transform',
    expect.stringContaining('rotate(30)')
  );
  expect(screen.getByText('Ok')).toHaveAttribute(
    'transform',
    expect.stringContaining('rotate(60)')
  );
  expect(screen.getByText('Cool')).toHaveAttribute(
    'transform',
    expect.stringContaining('rotate(90)')
  );
});

it('should render with custom fill', async () => {
  const fill = () => '#000000';

  render(<WordCloud data={data} fill={fill} />);

  await waitFor(() => screen.getByText('Hey'));

  expect(screen.getByText('Hey')).toHaveStyle('fill: #000000');
  expect(screen.getByText('Ok')).toHaveStyle('fill: #000000');
  expect(screen.getByText('Cool')).toHaveStyle('fill: #000000');
});

it('should support click handler', async () => {
  const onWordClick = jest.fn();

  render(<WordCloud data={data} onWordClick={onWordClick} />);

  await waitFor(() => screen.getByText('Hey'));

  fireEvent.click(screen.getByText('Hey'));

  expect(onWordClick).toBeCalled();
});

it('should support mouse over handler', async () => {
  const onWordMouseOver = jest.fn();

  render(<WordCloud data={data} onWordMouseOver={onWordMouseOver} />);

  await waitFor(() => screen.getByText('Hey'));

  fireEvent.mouseOver(screen.getByText('Hey'));

  expect(onWordMouseOver).toBeCalled();
});

it('should support mouse out handler', async () => {
  const onWordMouseOut = jest.fn();

  render(<WordCloud data={data} onWordMouseOut={onWordMouseOut} />);

  await waitFor(() => screen.getByText('Hey'));

  fireEvent.mouseOut(screen.getByText('Hey'));

  expect(onWordMouseOut).toBeCalled();
});
