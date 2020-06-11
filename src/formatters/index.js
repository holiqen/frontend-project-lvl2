import nestedFormat from './stylish';
import jsonFormat from './json';

const renderers = {
  nested: nestedFormat,
  json: jsonFormat,
};

const formatted = (diffObj, format) => {
  const render = renderers[format];
  return render(diffObj);
};

export default formatted;
