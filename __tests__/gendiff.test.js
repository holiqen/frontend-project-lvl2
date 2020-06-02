import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const fullPathBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.json');
const fullPathAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.json');

const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('genDiff', () => {
  expect(genDiff(fullPathBefore, fullPathAfter)).toBe(expected);
});
