import genDiff from '../src';
// import after from './__fixtures__/after.json';
// import before from './__fixtures__/before.json';

const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
- follow: false
}`;

test('genDiff', () => {
  expect(genDiff('./__fixtures__/after.json', './__fixtures__/before.json')).toBe(expected);
});
