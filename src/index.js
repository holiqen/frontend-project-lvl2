import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import process from 'process';
import parsers from './parsers';

const genDiff = (firstConfigurationFile, secondConfigurationFile) => {
  const pathFile1 = path.resolve(process.cwd(), firstConfigurationFile);
  const pathFile2 = path.resolve(process.cwd(), secondConfigurationFile);

  const dataFile1 = fs.readFileSync(pathFile1);
  const dataFile2 = fs.readFileSync(pathFile2);

  const obj1 = parsers(dataFile1, path.extname(firstConfigurationFile));
  const obj2 = parsers(dataFile2, path.extname(secondConfigurationFile));

  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = allKeys
    .map((key) => {
      const hasObj1 = key in obj1;
      const hasObj2 = key in obj2;
      const sameKeysAndValues = obj1[key] === obj2[key];
      const sameKeysAndDifferentValues = obj1[key] !== obj2[key];

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
