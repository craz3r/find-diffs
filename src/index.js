import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import generateAst from './ast';
import getRender from './renders';

const gendiff = (file1, file2, format) => {
  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);

  const parseFirst = getParser(ext1);
  const parseSecond = getParser(ext2);

  const before = fs.readFileSync(file1, 'utf-8');
  const after = fs.readFileSync(file2, 'utf-8');

  const parsedBefore = parseFirst(before);
  const parsedAfter = parseSecond(after);

  const astTree = generateAst(parsedBefore, parsedAfter);

  const render = getRender(format);

  console.log(render(astTree));
  return render(astTree);
};

export default gendiff;
