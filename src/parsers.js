import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (fileConf, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(fileConf);
  }

  if (fileExtension === '.yaml') {
    return yaml.safeLoad(fileConf);
  }

  return ini.parse(`${fileConf}`);
};

export default parsers;
