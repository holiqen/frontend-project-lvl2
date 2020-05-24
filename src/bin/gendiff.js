#!/usr/bin/env node

import genDiff from '../finddiff';

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.3')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstFile> <secondFile>')
  .action((firstFile, secondFile) => {
    console.log(genDiff(firstFile, secondFile));
  });

program.parse(process.argv);
