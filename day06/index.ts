import fs from 'fs';

const fileContent = fs
  .readFileSync('day06/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split(',')
  .map((e) => parseInt(e));

// Part 1 variables
let result1;

// Part 2 variables
let result2;

// 0, 1, 2, 3, 4, 5, 6, 7, 8
let fish_counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];
fileContent.forEach((fish) => {
  fish_counters[fish]++;
});

let new_counters = [...fish_counters];

for (let day = 1; day <= 256; day++) {
  if (day === 81) {
    result1 = fish_counters.reduce((p, c) => p + c);
  }
  fish_counters.forEach((no_of_fish, idx) => {
    new_counters[!idx ? 6 : idx - 1] += no_of_fish;
    new_counters[idx] -= no_of_fish;

    if (idx === 0) {
      new_counters[8] += no_of_fish;
    }
  });
  fish_counters = [...new_counters];
}
result2 = fish_counters.reduce((p, c) => p + c);

console.log(`Day 2 / Part 1\n\tResult: ${result1}`);
console.log(`Day 2 / Part 2\n\tResult: ${result2}`);
