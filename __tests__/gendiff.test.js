import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const jsonBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.json');
const jsonAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.json');

const yamlBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.yaml');
const yamlAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.yaml');

// const iniBefore = path.resolve(`${dirname}/__fixtures__/`, 'before.ini');
// const iniAfter = path.resolve(`${dirname}/__fixtures__/`, 'after.ini');

const expectedJson = '[{\"name\":\"common\",\"type\":\"nested\",\"children\":[{\"name\":\"setting1\",\"type\":\"unchanged\",\"value\":\"Value 1\"},{\"name\":\"setting2\",\"type\":\"deleted\",\"value\":200},{\"name\":\"setting3\",\"type\":\"changed\",\"valueBefore\":true,\"valueAfter\":{\"key\":\"value\"}},{\"name\":\"setting6\",\"type\":\"nested\",\"children\":[{\"name\":\"key\",\"type\":\"unchanged\",\"value\":\"value\"},{\"name\":\"ops\",\"type\":\"added\",\"value\":\"vops\"}]},{\"name\":\"follow\",\"type\":\"added\",\"value\":false},{\"name\":\"setting4\",\"type\":\"added\",\"value\":\"blah blah\"},{\"name\":\"setting5\",\"type\":\"added\",\"value\":{\"key5\":\"value5\"}}]},{\"name\":\"group1\",\"type\":\"nested\",\"children\":[{\"name\":\"baz\",\"type\":\"changed\",\"valueBefore\":\"bas\",\"valueAfter\":\"bars\"},{\"name\":\"foo\",\"type\":\"unchanged\",\"value\":\"bar\"},{\"name\":\"nest\",\"type\":\"changed\",\"valueBefore\":{\"key\":\"value\"},\"valueAfter\":\"str\"}]},{\"name\":\"group2\",\"type\":\"deleted\",\"value\":{\"abc\":12345}},{\"name\":\"group3\",\"type\":\"added\",\"value\":{\"fee\":100500}}]';


const expected = `{
  common: {
      setting1: Value 1
    - setting2: 200
    + setting3: {
          key: value
      }
    - setting3: true
      setting6: {
          key: value
        + ops: vops
      }
    + follow: false
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
  }
  group1: {
    + baz: bars
    - baz: bas
      foo: bar
    + nest: str
    - nest: {
          key: value
      }
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
}`;

test('json', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'json')).toBe(expectedJson);
});

test('yaml', () => {
  expect(genDiff(yamlBefore, yamlAfter)).toBe(expected);
});

// test('ini', () => {
//   expect(genDiff(iniBefore, iniAfter)).toBe(expected);
// });
