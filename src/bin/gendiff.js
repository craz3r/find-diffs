#!/usr/bin/env node

import Commander from 'commander';
import gendiff from '../';

Commander
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('2.2.1')
  .option('-f, --format [type]', 'Output format')
  .action((file1, file2, options) => {
    const format = options.format || 'default';
    console.log(gendiff(file1, file2, format));
  });

Commander.parse(process.argv);
