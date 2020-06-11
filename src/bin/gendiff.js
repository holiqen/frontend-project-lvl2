#!/usr/bin/env node

import genDiff from '../index';

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.3')
  .option('-f, --format [type]', 'output format', 'nested')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
    console.log(genDiff(firstFile, secondFile, program.format));
  });

program.parse(process.argv);
