import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import ast from './ast';
import render from './render';

const gendiff = (file1, file2) => {
  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);
  const parseFirst = getParser(ext1);
  const parseSecond = getParser(ext2);

  const before = parseFirst(fs.readFileSync(file1, 'utf-8'));
  const after = parseSecond(fs.readFileSync(file2, 'utf-8'));

  return render(ast(before, after));
};

export default gendiff;
