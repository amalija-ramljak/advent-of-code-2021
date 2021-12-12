import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day12/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n');

const cave_system: Record<string, string[]> = {};

puzzleInput.forEach((passage) => {
  const [cave_1, cave_2] = passage.split('-');
  if (cave_system[cave_1]) {
    cave_system[cave_1].push(cave_2);
  } else {
    cave_system[cave_1] = [cave_2];
  }
  if (cave_system[cave_2]) {
    cave_system[cave_2].push(cave_1);
  } else {
    cave_system[cave_2] = [cave_1];
  }
});

const isBig = (cave: string): boolean => {
  return cave.toUpperCase() === cave;
};

const START = 'start';
const END = 'end';

const paths = [];

const findPaths = (current_position: string, parent_path: string[]) => {
  if (current_position === END) {
    paths.push(parent_path);
    return;
  }

  for (let neighbour_cave of cave_system[current_position]) {
    if (neighbour_cave === START) continue;
    if (isBig(neighbour_cave) || !parent_path.includes(neighbour_cave)) {
      findPaths(neighbour_cave, parent_path.concat([neighbour_cave]));
    }
  }
};

// Part 1 variables
let result1;

// Part 2 variables
let result2;

findPaths(START, [START]);

result1 = paths.length;

console.log(`Day 12 / Part 1\n\tResult: ${result1}`);
console.log(`Day 12 / Part 2\n\tResult: ${result2}`);
