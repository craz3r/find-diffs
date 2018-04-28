#!/usr/bin/env node

import Commander from 'commander';
import gendiff from '../';

Commander
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('2.2.1')
  .option('-f, --format [type]', 'Output format', null, 'diff')
  .action((file1, file2, options) => {
    console.log(gendiff(file1, file2, options.format));
  });

Commander.parse(process.argv);
