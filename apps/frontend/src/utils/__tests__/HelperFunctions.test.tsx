// Tests for the HelperFunctions file
import { expect, test } from 'vitest';
import { formatDate, toCamelCase, trimTextToLength } from '../HelperFunctions';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('formatDate with numericDate set to true', () => {
  const dateStr = '2022-01-01';
  const expectedFormattedStr = new Date(dateStr).toLocaleDateString();
  const formattedStr = formatDate(dateStr, true);
  expect(formattedStr).toBe(expectedFormattedStr);
});

test('formatDate with numericDate set to false', () => {
  const dateStr = '2022-01-01';
  const expectedFormattedStr = new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedStr = formatDate(dateStr, false);
  expect(formattedStr).toBe(expectedFormattedStr);
});

test('trimTextToLength with text length less than length', () => {
  const text = 'Hello, World!';
  const length = 20;
  const trimmedText = text;
  expect(trimTextToLength(text, length)).toBe(trimmedText);
});

test('trimTextToLength with text length greater than length', () => {
  const text = 'Hello, World!';
  const length = 5;
  const trimmedText = 'Hello...';
  expect(trimTextToLength(text, length)).toBe(trimmedText);
});

test('toCamelCase with single word', () => {
  const input = 'hello';
  const expectedOutput = 'Hello';
  const output = toCamelCase(input);
  expect(output).toBe(expectedOutput);
});

test('toCamelCase with multiple words', () => {
  const input = 'hello_world';
  const expectedOutput = 'Hello World';
  const output = toCamelCase(input);
  expect(output).toBe(expectedOutput);
});

test('toCamelCase with words starting with uppercase', () => {
  const input = 'HELLO_WORLD';
  const expectedOutput = 'Hello World';
  const output = toCamelCase(input);
  expect(output).toBe(expectedOutput);
});
