import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day08/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n');

const original_segments_used = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];

// Part 1 variables
let result1 = 0;
const unique_digits = [1, 4, 7, 8];

// Part 2 variables
let result2 = 0;

let unique_signals, output;
const mappings = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
};
type mappingKey = keyof typeof mappings;
let segments_used: string[] = [];
puzzleInput.forEach((display) => {
  segments_used = original_segments_used.slice();

  [unique_signals, output] = display.split(' | ');
  unique_signals = unique_signals.split(' ').map((signal) => signal.split(''));
  output = output.split(' ');

  let [cf_possibilities] = unique_signals.filter(
    (signal) => signal.length === original_segments_used[1].length
  );
  let [acf_possibilities] = unique_signals.filter(
    (signal) => signal.length === original_segments_used[7].length
  );

  mappings['a'] = acf_possibilities.filter((segment) => !cf_possibilities.includes(segment))[0];

  // has a
  let digits_235 = unique_signals.filter(
    (signal) => signal.length === original_segments_used[2].length
  );

  let dg_possibilities = digits_235[0]
    .filter((segment) => digits_235[1].includes(segment))
    .filter((segment) => digits_235[2].includes(segment))
    .filter((segment) => segment !== mappings['a']);

  let digits_069 = unique_signals.filter(
    (signal) => signal.length === original_segments_used[0].length
  );
  let bfg_possibilities = digits_069[0]
    .filter((segment) => digits_069[1].includes(segment))
    .filter((segment) => digits_069[2].includes(segment))
    .filter((segment) => segment !== mappings['a']);

  mappings['g'] = dg_possibilities.filter((segment) => bfg_possibilities.includes(segment))[0];

  // has a, g
  let bf_possibilities = bfg_possibilities.filter((segment) => segment !== mappings['g']);

  let [bcdf_possibilities] = unique_signals.filter(
    (signal) => signal.length === original_segments_used[4].length
  );

  mappings['e'] = unique_signals
    .filter((signal) => signal.length === original_segments_used[8].length)[0] // abcdefg
    .filter(
      (segment) =>
        segment !== mappings['a'] &&
        segment !== mappings['g'] &&
        !bcdf_possibilities.includes(segment)
    )[0];
    
  mappings['d'] = dg_possibilities.filter((segment) => segment !== mappings['g'])[0];

  // has a, e, g
  mappings['c'] = bcdf_possibilities
    .filter((segment) => !bf_possibilities.includes(segment))
    .filter((segment) => !dg_possibilities.includes(segment))[0];

  // has a, c, d, e, g
  mappings['f'] = cf_possibilities.filter((segment) => segment !== mappings['c'])[0];

  // has a, c, d, e, f, g
  mappings['b'] = bf_possibilities.filter((segment) => segment !== mappings['f'])[0];

  let newSegments: string[] = [];
  for (let i = 0; i < original_segments_used.length; i++) {
    newSegments.length = 0;
    original_segments_used[i].split('').forEach((segment) => {
      newSegments.push(mappings[segment as mappingKey]);
    });
    segments_used[i] = newSegments.sort().join('');
  }

  // has all
  let outputValue = '';
  output.forEach((digit) => {
    digit = digit.split('').sort().join('');
    unique_digits.forEach((num) => {
      if (digit.length === original_segments_used[num].length) {
        result1++;
      }
    });

    outputValue += segments_used.findIndex((segments) => {
      return segments === digit;
    });
  });

  result2 += parseInt(outputValue, 10);
});

console.log(`Day 8 / Part 1\n\tResult: ${result1}`);
console.log(`Day 8 / Part 2\n\tResult: ${result2}`);
