import _ from 'lodash';
import fs from 'fs';

const gendiff = (file1, file2) => {
  const before = JSON.parse(fs.readFileSync(file1));
  const after = JSON.parse(fs.readFileSync(file2));
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);
  return `{\n${_.union(beforeKeys, afterKeys).reduce((acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (after[key] === before[key]) return [...acc, `   ${key}: ${before[key]}`];
      return [...acc, ` + ${key}: ${after[key]}\n - ${key}: ${before[key]}`];
    } else if (_.has(before, key)) {
      return [...acc, ` - ${key}: ${before[key]}`];
    }
    return [...acc, ` + ${key}: ${after[key]}`];
  }, '').join('\n')}\n}\n`;
};

export default gendiff;
