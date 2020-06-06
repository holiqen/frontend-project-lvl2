import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const jsonBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.json');
const jsonAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.json');

const yamlBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.yaml');
const yamlAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.yaml');

const iniBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.ini');
const iniAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.ini');

const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('json', () => {
  expect(genDiff(jsonBefore, jsonAfter)).toBe(expected);
});

test('yaml', () => {
  expect(genDiff(yamlBefore, yamlAfter)).toBe(expected);
});

test('ini', () => {
  expect(genDiff(iniBefore, iniAfter)).toBe(expected);
});
