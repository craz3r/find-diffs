import fs from 'fs';
import gendiff from '../src';

const res = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

test('diffs between json', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';

  expect(gendiff(path1, path2)).toBe(res);
});

test('diffs between yaml', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.yml';

  expect(gendiff(path1, path2)).toBe(res);
});

test('diffs between yaml and json', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.json';

  expect(gendiff(path1, path2)).toBe(res);
});
