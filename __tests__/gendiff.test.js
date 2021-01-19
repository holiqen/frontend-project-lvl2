import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const jsonBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.json');
const jsonAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.json');

const yamlBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.yaml');
const yamlAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.yaml');

const iniBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.ini');
const iniAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.ini');

const plainExpected = fs.readFileSync(`${dirname}/__fixtures__/plainExpected.txt`, 'utf8');
const jsonExpected = fs.readFileSync(`${dirname}/__fixtures__/jsonExpected.txt`, 'utf8');
const nestedExpected = fs.readFileSync(`${dirname}/__fixtures__/nestedExpected.txt`, 'utf8');

test('json', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'json')).toBe(jsonExpected);
});

test('yaml', () => {
  expect(genDiff(yamlBefore, yamlAfter, 'nested')).toBe(nestedExpected);
});

test('ini', () => {
  expect(genDiff(iniBefore, iniAfter, 'plain')).toBe(plainExpected);
});
