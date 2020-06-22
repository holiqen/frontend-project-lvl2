import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import process from 'process';
import getParseByExtension from './parsers';
import getFormattedDiff from './formatters';

const genDiff = (
  firstConfigurationFile,
  secondConfigurationFile,
  format = 'nested',
) => {
  const getFirstConfigPath = path.resolve(
    process.cwd(),
    firstConfigurationFile,
  );
  const getSecondConfigPath = path.resolve(
    process.cwd(),
    secondConfigurationFile,
  );

  const getFirstConfigData = fs.readFileSync(getFirstConfigPath);
  const getSecondConfigData = fs.readFileSync(getSecondConfigPath);

  const firstParseConfig = getParseByExtension(
    getFirstConfigData,
    path.extname(firstConfigurationFile),
  );
  const secondParseConfig = getParseByExtension(
    getSecondConfigData,
    path.extname(secondConfigurationFile),
  );

  function result(firstConfig, secondConfig) {
    const allKeys = _.union(
      Object.keys(firstConfig),
      Object.keys(secondConfig),
    );
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
        return {
          name: key,
          type: 'nested',
          children: result(firstConfig[key], secondConfig[key]),
        };
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

  return getFormattedDiff(result(firstParseConfig, secondParseConfig), format);
};

export default genDiff;
