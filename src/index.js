import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import process from 'process';
import getParse from './parsers';
import getFormat from './formatters';

const genDiff = (firstConfigurationFile, secondConfigurationFile, format = 'nested') => {
  const pathFile1 = path.resolve(process.cwd(), firstConfigurationFile);
  const pathFile2 = path.resolve(process.cwd(), secondConfigurationFile);

  const dataFile1 = fs.readFileSync(pathFile1);
  const dataFile2 = fs.readFileSync(pathFile2);

  const obj1 = getParse(dataFile1, path.extname(firstConfigurationFile));
  const obj2 = getParse(dataFile2, path.extname(secondConfigurationFile));

  function result(firstConfig, secondConfig) {
    const allKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
    return allKeys.map((key) => {
      const hasObj1 = key in firstConfig;
      const hasObj2 = key in secondConfig;
      const sameKeysAndDifferentValues = firstConfig[key] !== secondConfig[key];
      const bothAreObjects = _.isObject(firstConfig[key]) && _.isObject(secondConfig[key]);

      if (!hasObj1) {
        return { name: key, type: 'added', value: secondConfig[key] };
      }
      if (!hasObj2) {
        return { name: key, type: 'deleted', value: firstConfig[key] };
      }
      if (bothAreObjects) {
        return { name: key, type: 'nested', children: result(firstConfig[key], secondConfig[key]) };
      }
      if (sameKeysAndDifferentValues) {
        return {
          name: key,
          type: 'changed',
          valueBefore: firstConfig[key],
          valueAfter: secondConfig[key],
        };
      }
      return { name: key, type: 'unchanged', value: firstConfig[key] };
    });
  }

  return getFormat(result(obj1, obj2), format);
};

export default genDiff;
