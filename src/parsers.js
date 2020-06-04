import yaml from 'js-yaml';

const parsers = (fileConf, fileExtension) => (fileExtension === '.json' ? JSON.parse(fileConf) : yaml.safeLoad(fileConf));

export default parsers;
