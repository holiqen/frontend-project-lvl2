import isObject from 'lodash/isObject.js';

const stringify = (value) => (!isObject(value) ? value : '[complex value]');

const plainFormat = (configAst, path) => {
  const lines = configAst.map((tree) => {
    const {
      name, value, ...node
    } = tree;

    const fullPath = path ? `${path}.${name}` : `${name}`;

    switch (node.type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${stringify(value)}`;

      case 'deleted':
        return `Property '${fullPath}' was deleted`;

      case 'changed':
        return `Property '${fullPath}' was changed from '${stringify(node.valueBefore)}' to '${stringify(node.valueAfter)}'`;

      case 'nested':
        return `${plainFormat(node.children, fullPath)}`;

      case 'unchanged':
        return null;

      default:
        return 'Error';
    }
  });

  return lines.filter((line) => line !== null).join('\n');
};

export default plainFormat;
