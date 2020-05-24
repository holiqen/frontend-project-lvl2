#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const process = require('process');

const genDiff = (file1, file2) => {
  const pathFile1 = path.resolve(process.cwd(), file1);
  const pathFile2 = path.resolve(process.cwd(), file2);

  const dataFile1 = fs.readFileSync(pathFile1);
  const dataFile2 = fs.readFileSync(pathFile2);

  const obj1 = JSON.parse(dataFile1);
  const obj2 = JSON.parse(dataFile2);

  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = allKeys
    .map((key) => {
      const hasObj1 = Object.prototype.hasOwnProperty.call(obj1, key);
      const hasObj2 = Object.prototype.hasOwnProperty.call(obj2, key);
      const sameKeysAndValues = hasObj1 && hasObj2 && obj1[key] === obj2[key];
      const sameKeysAndDifferentValues = hasObj1 && hasObj2 && obj1[key] !== obj2[key];

      if (!hasObj1) {
        return `+ ${key}: ${obj2[key]}`;
      }
      if (!hasObj2) {
        return `- ${key}: ${obj1[key]}`;
      }
      if (sameKeysAndValues) {
        return `  ${key}: ${obj1[key]}`;
      }
      if (sameKeysAndDifferentValues) {
        return `+ ${key}: ${obj2[key]}\n- ${key}: ${obj1[key]}`;
      }
      return null;
    })
    .join('\n');

  return `{\n${result}\n}`;
};

export default genDiff;
