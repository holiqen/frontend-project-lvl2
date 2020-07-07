import path from 'path';
import fs from 'fs';
import process from 'process';
import getParseByExtension from './parsers';
import getFormattedDiff from './formatters';
import createConfigAst from './createAst';

const getConfigData = (configurationFile) => (
  fs.readFileSync(path.resolve(process.cwd(), configurationFile), 'utf-8')
);

const genDiff = (
  firstConfig,
  secondConfig,
  format = 'nested',
) => {
  const firstParsedData = getParseByExtension(
    getConfigData(firstConfig),
    path.extname(firstConfig),
  );
  const secondParsedData = getParseByExtension(
    getConfigData(secondConfig),
    path.extname(secondConfig),
  );
  return getFormattedDiff(createConfigAst(firstParsedData, secondParsedData), format);
};

export default genDiff;
