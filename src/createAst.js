import _ from 'lodash';

const getAllConfigKeys = (firstConfig, secondConfig) => (
  _.union(Object.keys(firstConfig), Object.keys(secondConfig))
);

const isKeyInConfig = (key, config) => key in config;

const createConfigAst = (firstConfig, secondConfig) => (
  getAllConfigKeys(firstConfig, secondConfig).map((key) => {
    const sameKeysAndDifferentValues = firstConfig[key] !== secondConfig[key];
    const bothAreObjects = _.isObject(firstConfig[key]) && _.isObject(secondConfig[key]);

    if (!isKeyInConfig(key, firstConfig)) {
      return { name: key, type: 'added', value: secondConfig[key] };
    }

    if (!isKeyInConfig(key, secondConfig)) {
      return { name: key, type: 'deleted', value: firstConfig[key] };
    }

    if (bothAreObjects) {
      return {
        name: key,
        type: 'nested',
        children: createConfigAst(firstConfig[key], secondConfig[key]),
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
  })
);


export default createConfigAst;
