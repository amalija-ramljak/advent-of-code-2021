import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day12/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n');

const caveSystem: Record<string, string[]> = {};

puzzleInput.forEach((passage) => {
  const [cave_1, cave_2] = passage.split('-');
  if (caveSystem[cave_1]) {
    caveSystem[cave_1].push(cave_2);
  } else {
    caveSystem[cave_1] = [cave_2];
  }
  if (caveSystem[cave_2]) {
    caveSystem[cave_2].push(cave_1);
  } else {
    caveSystem[cave_2] = [cave_1];
  }
});

const isBig = (cave: string): boolean => {
  return cave.toUpperCase() === cave;
};

// Part 1 variables
let result1;

// Part 2 variables
let result2;



console.log(`Day 12 / Part 1\n\tResult: ${result1}`);
console.log(`Day 12 / Part 2\n\tResult: ${result2}`);
