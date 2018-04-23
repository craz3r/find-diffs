#!/usr/bin/env node

import Commander from 'commander';

Commander
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
