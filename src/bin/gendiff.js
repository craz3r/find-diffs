#!/usr/bin/env node

import Commander from 'commander';
import gendiff from '../';

Commander
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.2')
  .option('-f, --format [type]', 'Output format')
  .action((file1, file2) => {
    console.log(gendiff(file1, file2));
  });

Commander.parse(process.argv);
