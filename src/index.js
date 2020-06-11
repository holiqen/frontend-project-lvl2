import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import process from 'process';
import parsers from './parsers';
import formatted from './formatters';

const genDiff = (firstConfigurationFile, secondConfigurationFile, format = 'nested') => {
  const pathFile1 = path.resolve(process.cwd(), firstConfigurationFile);
  const pathFile2 = path.resolve(process.cwd(), secondConfigurationFile);

  const dataFile1 = fs.readFileSync(pathFile1);
  const dataFile2 = fs.readFileSync(pathFile2);

  const obj1 = parsers(dataFile1, path.extname(firstConfigurationFile));
  const obj2 = parsers(dataFile2, path.extname(secondConfigurationFile));

  function result(file1, file2) {
    const allKeys = _.union(Object.keys(file1), Object.keys(file2));
    return allKeys.map((key) => {
      const hasObj1 = key in file1;
      const hasObj2 = key in file2;
      const sameKeysAndDifferentValues = file1[key] !== file2[key];
      const isObjects = _.isObject(file1[key]) && _.isObject(file2[key]);

      if (!hasObj1) {
        return { name: key, type: 'added', value: file2[key] };
      }
      if (!hasObj2) {
        return { name: key, type: 'deleted', value: file1[key] };
      }
      if (isObjects) {
        return { name: key, type: 'nested', children: result(file1[key], file2[key]) };
      }
      if (sameKeysAndDifferentValues) {
        return {
          name: key,
          type: 'changed',
          valueBefore: file1[key],
          valueAfter: file2[key],
        };
      }
      return { name: key, type: 'unchanged', value: file1[key] };
    });
  }

  return formatted(result(obj1, obj2), format);
};

export default genDiff;
