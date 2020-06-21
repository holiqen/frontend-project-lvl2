import yaml from 'js-yaml';
import ini from 'ini';

const getParse = (fileConf, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(fileConf);
  }

  if (fileExtension === '.yaml' || fileExtension === '.yml') {
    return yaml.safeLoad(fileConf);
  }

  return ini.parse(`${fileConf}`);
};

export default getParse;
