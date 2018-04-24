import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const gendiff = (file1, file2) => {
  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);
  const parseFirst = getParser(ext1);
  const parseSecond = getParser(ext2);

  const before = parseFirst(fs.readFileSync(file1, 'utf-8'));
  const after = parseSecond(fs.readFileSync(file2, 'utf-8'));

  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  return `{\n${_.union(beforeKeys, afterKeys).map((key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (after[key] === before[key]) return `   ${key}: ${before[key]}`;
      return ` + ${key}: ${after[key]}\n - ${key}: ${before[key]}`;
    } else if (_.has(before, key)) return ` - ${key}: ${before[key]}`;
    return ` + ${key}: ${after[key]}`;
  }).join('\n')}\n}\n`;
};

export default gendiff;
