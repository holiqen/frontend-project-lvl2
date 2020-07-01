import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth);

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return value;
  }

  const nested = _.keys(value).map(
    (key) => `${indent(depth + 5)}${key}: ${value[key]}`,
  );

  return `{\n${nested.join('\n')}\n${indent(depth + 1)}}`;
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
          return `${indent(depth)}  ${name}: ${stringify(value, depth + 1)}`;

        case 'nested':
          return `${indent(depth)}  ${name}: {\n${iter(node.children, depth + 4)}\n${indent(depth + 2)}}`;

        default:
          return 'Error';
      }
    })
    .join('\n');

  return `{\n${iter(configAst)}\n}`;
};

export default nestedFormat;
