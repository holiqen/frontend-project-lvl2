import nestedFormat from './stylish.js';
import jsonFormat from './json.js';
import plainFormat from './plain.js';

const formatType = {
  nested: nestedFormat,
  json: jsonFormat,
  plain: plainFormat,
};

const getFormattedDiff = (diffObj, format) => {
  const render = formatType[format];
  return render(diffObj);
};

export default getFormattedDiff;
