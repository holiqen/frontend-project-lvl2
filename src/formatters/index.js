import nestedFormat from './stylish';
import jsonFormat from './json';
import plainFormat from './plain';

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
