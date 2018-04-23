import fs from 'fs';
import gendiff from '../src';

test('diffs between before and after', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(gendiff(path1, path2)).toBe(result);
});
