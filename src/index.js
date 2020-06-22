import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import process from 'process';
import getParseByExtension from './parsers';
import getFormattedDiff from './formatters';

const getAllConfigKeys = (firstConfig, secondConfig) => (
  _.union(Object.keys(firstConfig), Object.keys(secondConfig))
);

const getConfigData = (configurationFile) => (
  fs.readFileSync(path.resolve(process.cwd(), configurationFile))
);

const genDiff = (
  firstConfigurationFile,
  secondConfigurationFile,
  format = 'nested',
) => {
  const firstParseConfig = getParseByExtension(
    getConfigData(firstConfigurationFile),
    path.extname(firstConfigurationFile),
  );
  const secondParseConfig = getParseByExtension(
    getConfigData(secondConfigurationFile),
    path.extname(secondConfigurationFile),
  );

  function result(firstConfig, secondConfig) {
    return getAllConfigKeys(firstConfig, secondConfig).map((key) => {
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
