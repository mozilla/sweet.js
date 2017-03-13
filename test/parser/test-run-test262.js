import test from 'ava';
import fs from 'fs';

import { compile } from '../../src/sweet.js';
import NodeLoader from '../../src/node-loader';

// TODO: make these pass
const passExcluded = [
  // known problems with the reader
  '1252.script.js',
  '978.script.js',
  '953.script.js',
  '952.script.js',
  '951.script.js',
  '950.script.js',
  '949.script.js',
  '947.script.js',
  '669.script.js',
  '582.script.js',
  '348.script.js',
  '315.script.js',
  '314.script.js',
  '311.script.js',
  '299.script.js',
  '211.script.js',
  '210.script.js',
  '1657.script.js',
  '1656.script.js',
  '1655.script.js',
  '1654.script.js',
  '1328.script.js',

  '1012.script.js',
  '1057.module.js',
  '106.script.js',
  '1073.script.js',
  '1074.script.js',
  '1077.script.js',
  '1116.module.js',
  '1117.module.js',
  '1118.module.js',
  '1119.module.js',
  '1120.module.js',
  '1121.module.js',
  '1122.module.js',
  '1123.module.js',
  '1124.module.js',
  '1125.module.js',
  '1126.module.js',
  '1127.module.js',
  '1128.script.js',
  '1129.script.js',
  '1130.script.js',
  '1131.script.js',
  '1138.script.js',
  '1166.script.js',
  '117.script.js',
  '1202.script.js',
  '1239.script.js',
  '1240.script.js',
  '1245.script.js',
  '1246.script.js',
  '1247.script.js',
  '1248.script.js',
  '128.script.js',
  '1307.script.js',
  '1319.script.js',
  '1334.script.js',
  '1335.script.js',
  '1364.script.js',
  '1370.script.js',
  '140.script.js',
  '1427.script.js',
  '1428.script.js',
  '1429.script.js',
  '1430.script.js',
  '1431.script.js',
  '1432.script.js',
  '1434.script.js',
  '1467.script.js',
  '1623.script.js',
  '1638.script.js',
  '1686.module.js',
  '1687.module.js',
  '1688.module.js',
  '1689.module.js',
  '1692.module.js',
  '1736.script.js',
  '1739.script.js',
  '1745.script.js',
  '1779.script.js',
  '1789.script.js',
  '1844.script.js',
  '1954.script.js',
  '285.script.js',
  '290.script.js',
  '295.script.js',
  '296.script.js',
  '297.script.js',
  '301.script.js',
  '350.script.js',
  '37.script.js',
  '389.script.js',
  '391.script.js',
  '393.script.js',
  '412.module.js',
  '414.module.js',
  '415.module.js',
  '416.module.js',
  '417.module.js',
  '418.module.js',
  '419.module.js',
  '420.module.js',
  '516.script.js',
  '523.module.js',
  '533.script.js',
  '538.script.js',
  '572.script.js',
  '583.script.js',
  '608.script.js',
  '679.script.js',
  '680.script.js',
  '681.script.js',
  '84.script.js',
  '95.script.js',
  '993.script.js',
  '995.script.js',
];

const PARSER_TEST_DIR = 'test262-parser-tests';
const EXTRA_TEST_DIR = 'extra-parser-tests';

let pass = fs.readdirSync(`./test/parser/${PARSER_TEST_DIR}/pass`);
let fail = fs.readdirSync(`./test/parser/${PARSER_TEST_DIR}/fail`); // eslint-disable-line no-unused-vars

let passExtra = fs.readdirSync(`./test/parser/${EXTRA_TEST_DIR}/pass`);

function mkTester(subdir, testDir) {
  function f(t, fname) {
    let result = compile(
      `./${testDir}/${subdir}/${fname}`,
      new NodeLoader(__dirname),
    );
    t.not(result, null);
  }
  f.title = (title, fname, expected) => {
    let src = fs.readFileSync(
      `./test/parser/${testDir}/${subdir}/${fname}`,
      'utf8',
    );
    return `${fname}:
${src}
`;
  };
  return f;
}

let passTest = mkTester('pass', PARSER_TEST_DIR);
let extras = mkTester('pass', EXTRA_TEST_DIR);

pass.filter(f => !passExcluded.includes(f)).forEach(f => {
  test(passTest, f);
});

passExtra.forEach(f => {
  test(extras, f);
});
