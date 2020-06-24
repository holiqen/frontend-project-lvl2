import yaml from 'js-yaml';
import ini from 'ini';

const extensionType = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const getParseByExtension = (config, configExtension) => {
  const render = extensionType[configExtension.slice(1)];

  return render(`${config}`);
};

export default getParseByExtension;
