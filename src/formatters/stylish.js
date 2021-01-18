import isObject from 'lodash/isObject.js';
import keys from 'lodash/keys.js';

const indent = (depth) => '    '.repeat(depth);

const stringify = (value, depth = 0) => {
  if (!isObject(value)) {
    return value;
  }

  const nested = keys(value).map(
    (key) => `${indent(depth)}  ${key}: ${value[key]}`,
  );

  return `{\n${nested.join('\n')}\n${indent(depth - 1)}  }`;
};

const nestedFormat = (configAst) => {
  const iter = (tree, depth = 0) => tree
    .map(({
      name, value, ...node
    }) => {
      switch (node.type) {
        case 'added':
          return `${indent(depth)}+ ${name}: ${stringify(value, depth + 1)}`;

        case 'deleted':
          return `${indent(depth)}- ${name}: ${stringify(value, depth + 1)}`;

        case 'changed':
          return `${indent(depth)}+ ${name}: ${stringify(node.valueAfter, depth + 1)}\n${indent(depth)}- ${name}: ${stringify(node.valueBefore, depth + 1)}`;

        case 'unchanged':
          return `${indent(depth)}  ${name}: ${stringify(value, depth)}`;

        case 'nested':
          return `${indent(depth)}  ${name}: {\n${iter(node.children, depth + 1)}\n  ${indent(depth)}}`;

        default:
          return 'Error';
      }
    })
    .join('\n');

  return `{\n${iter(configAst)}\n}`;
};

export default nestedFormat;
