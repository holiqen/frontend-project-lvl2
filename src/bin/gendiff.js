#!/usr/bin/env node

import * as _ from "lodash";
import process from "process";

const path = require("path");
const fs = require("fs");

const { program } = require("commander");

program
  .description("Compares two configuration files and shows a difference.")
  .version("0.1.3")
  .option("-f, --format [type]", "output format")
  .action(genDiff());

program.parse(process.argv);

const pathTest = "exsample.json";
const pathTest2 = "test.json";

const pathT = path.resolve(process.cwd(), pathTest);
const pathT2 = path.resolve(process.cwd(), pathTest2);

const data = fs.readFileSync(pathT);
const data2 = fs.readFileSync(pathT2);

const test = JSON.parse(data);
const test2 = JSON.parse(data2);

const genDiff = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = allKeys
    .map((key) => {
      const hasObj1 = obj1.hasOwnProperty(key);
      const hasObj2 = obj2.hasOwnProperty(key);
      const sameKeysAndValues = hasObj1 && hasObj2 && obj1[key] === obj2[key];
      const sameKeysAndDifferentValues =
        hasObj1 && hasObj2 && obj1[key] !== obj2[key];

      if (!hasObj1) {
        return `+ ${key}: ${obj2[key]}`;
      }
      if (!hasObj2) {
        return `- ${key}: ${obj1[key]}`;
      }
      if (sameKeysAndValues) {
        return `  ${key}: ${obj1[key]}`;
      }
      if (sameKeysAndDifferentValues) {
        return `+ ${key}: ${obj2[key]}\n- ${key}: ${obj1[key]}`;
      }
    })
    .join("\n");

  return `{\n${result}\n}`;
};

export default genDiff;
