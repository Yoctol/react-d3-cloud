import React from 'react';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import WordCloud, { Word } from '../WordCloud';

const data = [
  { text: 'Hey', value: 1 },
  { text: 'Ok', value: 5 },
  { text: 'Cool', value: 10 },
];

function renderInStrictMode(ui: React.ReactElement): RenderResult {
  return render(ui, { wrapper: React.StrictMode });
}

it('should render words', async () => {
  renderInStrictMode(<WordCloud data={data} />);

  await screen.findByText('Hey');

  expect(screen.getByText('Hey')).toBeInTheDocument();
  expect(screen.getByText('Ok')).toBeInTheDocument();
  expect(screen.getByText('Cool')).toBeInTheDocument();
});

it('should render correct words after re-render', async () => {
  const { rerender } = renderInStrictMode(<WordCloud data={data} />);

  const newData = [
    { text: 'New', value: 1 },
    { text: 'World', value: 5 },
  ];
  rerender(<WordCloud data={newData} />);

  await screen.findByText('New');

  expect(screen.queryByText('Hey')).not.toBeInTheDocument();
  expect(screen.queryByText('Ok')).not.toBeInTheDocument();
  expect(screen.queryByText('Cool')).not.toBeInTheDocument();

  expect(screen.getByText('New')).toBeInTheDocument();
  expect(screen.getByText('World')).toBeInTheDocument();
});

it('should render with custom font', async () => {
  const font = 'sans-serif';

  renderInStrictMode(<WordCloud data={data} font={font} />);

  await screen.findByText('Hey');

  expect(screen.getByText('Hey')).toHaveStyle('font-family: sans-serif');
  expect(screen.getByText('Ok')).toHaveStyle('font-family: sans-serif');
  expect(screen.getByText('Cool')).toHaveStyle('font-family: sans-serif');
});

it('should render with custom fontStyle', async () => {
  const fontStyle = 'bold';

  renderInStrictMode(<WordCloud data={data} fontStyle={fontStyle} />);

  await screen.findByText('Hey');

  expect(screen.getByText('Hey')).toHaveStyle('font-style: bold');
  expect(screen.getByText('Ok')).toHaveStyle('font-style: bold');
  expect(screen.getByText('Cool')).toHaveStyle('font-style: bold');
});

it('should render with custom fontWeight', async () => {
  const fontWeight = 900;

  renderInStrictMode(<WordCloud data={data} fontWeight={fontWeight} />);

  await screen.findByText('Hey');

  expect(screen.getByText('Hey')).toHaveStyle('font-weight: 900');
  expect(screen.getByText('Ok')).toHaveStyle('font-weight: 900');
  expect(screen.getByText('Cool')).toHaveStyle('font-weight: 900');
});

it('should render with custom fontSize', async () => {
  const fontSize = (d: Word) => d.value * 2;

  renderInStrictMode(<WordCloud data={data} fontSize={fontSize} />);

  await screen.findByText('Hey');

  expect(screen.getByText('Hey')).toHaveStyle('font-size: 2px');
  expect(screen.getByText('Ok')).toHaveStyle('font-size: 10px');
  expect(screen.getByText('Cool')).toHaveStyle('font-size: 20px');
});

it('should render with custom rotate', async () => {
  const rotate = (_: Word, i: number) => (i + 1) * 30;

  renderInStrictMode(<WordCloud data={data} rotate={rotate} />);

  await screen.findByText('Hey');

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

  renderInStrictMode(<WordCloud data={data} fill={fill} />);

  await screen.findByText('Hey');

  expect(screen.getByText('Hey')).toHaveStyle('fill: #000000');
  expect(screen.getByText('Ok')).toHaveStyle('fill: #000000');
  expect(screen.getByText('Cool')).toHaveStyle('fill: #000000');
});

it('should support click handler', async () => {
  const onWordClick = jest.fn();

  renderInStrictMode(<WordCloud data={data} onWordClick={onWordClick} />);

  await screen.findByText('Hey');

  fireEvent.click(screen.getByText('Hey'));

  expect(onWordClick).toBeCalled();
});

it('should support mouse over handler', async () => {
  const onWordMouseOver = jest.fn();

  renderInStrictMode(
    <WordCloud data={data} onWordMouseOver={onWordMouseOver} />
  );

  await screen.findByText('Hey');

  fireEvent.mouseOver(screen.getByText('Hey'));

  expect(onWordMouseOver).toBeCalled();
});

it('should support mouse out handler', async () => {
  const onWordMouseOut = jest.fn();

  renderInStrictMode(<WordCloud data={data} onWordMouseOut={onWordMouseOut} />);

  await screen.findByText('Hey');

  fireEvent.mouseOut(screen.getByText('Hey'));

  expect(onWordMouseOut).toBeCalled();
});
