import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day07/puzzleInput.txt', { encoding: 'utf8', flag: 'r' })
  .split(',')
  .map(e => parseInt(e));

puzzleInput.sort((a, b) => a - b);

// Part 1 variables
let result1 = 0;

// Part 2 variables
let result2 = 0;

const mean_position = puzzleInput[Math.floor(puzzleInput.length / 2)];
const average_position = Math.floor(puzzleInput.reduce((p, c) => p + c) / puzzleInput.length);
let diff;
puzzleInput.forEach(crab_position => {
    diff = Math.abs(crab_position - mean_position);
    result1 += diff;
    
    diff = Math.abs(crab_position - average_position);
    result2 += (diff * (diff + 1)) / 2;
})

console.log(`Day 7 / Part 1\n\tResult: ${result1}`);
console.log(`Day 7 / Part 2\n\tResult: ${result2}`);
