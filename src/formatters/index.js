import nestedFormat from './stylish';
import jsonFormat from './json';
import plainFormat from './plain';

const renderers = {
  nested: nestedFormat,
  json: jsonFormat,
  plain: plainFormat,
};

const formatted = (diffObj, format) => {
  const render = renderers[format];
  return render(diffObj);
};

export default formatted;
