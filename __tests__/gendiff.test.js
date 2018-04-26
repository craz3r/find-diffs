import fs from 'fs';
import gendiff from '../src';

test('diffs between json', () => {
  const path1 = '__tests__/__fixtures__/before.json';
  const path2 = '__tests__/__fixtures__/after.json';
  const res = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(gendiff(path1, path2, 'default')).toBe(res);
});

test('diffs between yaml', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.yml';
  const res = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(gendiff(path1, path2, 'default')).toBe(res);
});

test('diffs between yaml and json', () => {
  const path1 = '__tests__/__fixtures__/before.yml';
  const path2 = '__tests__/__fixtures__/after.json';
  const res = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(gendiff(path1, path2, 'default')).toBe(res);
});

test('diffs between ini', () => {
  const path1 = '__tests__/__fixtures__/before.ini';
  const path2 = '__tests__/__fixtures__/after.ini';
  const res = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

  expect(gendiff(path1, path2, 'default')).toEqual(res);
});
