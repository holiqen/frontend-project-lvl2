import _ from 'lodash';

const stringify = (value) => (!_.isObject(value) ? value : '[complex value]');

const plainFormat = (difObj, path) => {
  const lines = difObj.map((key) => {
    const {
      type, name, value, valueAfter, valueBefore, children,
    } = key;
    const fullPath = path ? `${path}.${name}` : `${name}`;
    switch (type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${fullPath}' was deleted`;
      case 'changed':
        return `Property '${fullPath}' was changed from '${stringify(valueBefore)}' to '${stringify(valueAfter)}'`;
      case 'nested':
        return `${plainFormat(children, fullPath)}`;
      case 'unchanged':
        return null;
      default:
        return 'Error';
    }
  });
  return lines.filter((line) => line !== null).join('\n');
};

export default plainFormat;
