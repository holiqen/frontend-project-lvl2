import _ from 'lodash';

const nestedFormat = (difObj) => {
  const iter = (data, depth = 0) => {
    const tab = ' ';
    const indent = (level) => tab.repeat(level);

    const stringify = (value, level = 0) => {
      if (!_.isObject(value)) {
        return value;
      }
      const nested = _.keys(value).map((key) => `${indent(level + 5)}${key}: ${value[key]}`);
      return `{\n${nested.join('\n')}\n${indent(level + 1)}}`;
    };

    return data.map(({
      type, name, value, valueAfter, valueBefore, children,
    }) => {
      switch (type) {
        case 'added':
          return `${indent(depth)}+ ${name}: ${stringify(value, depth + 1)}`;

        case 'deleted':
          return `${indent(depth)}- ${name}: ${stringify(value, depth + 1)}`;

        case 'changed':
          return `${indent(depth)}+ ${name}: ${stringify(valueAfter, depth + 1)}\n${indent(depth)}- ${name}: ${stringify(valueBefore, depth + 1)}`;

        case 'unchanged':
          return `${indent(depth)}  ${name}: ${stringify(value, depth + 1)}`;

        case 'nested':
          return `${indent(depth)}  ${name}: {\n${iter(children, depth + 4)}\n${indent(depth + 2)}}`;

        default:
          return 'Error';
      }
    }).join('\n');
  };
  return `{\n${iter(difObj)}\n}`;
};

export default nestedFormat;
