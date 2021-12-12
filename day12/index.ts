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

// Part 1 variables
let result1;

const paths_1: string[][] = [];
const findPaths_1 = (current_position: string, parent_path: string[]) => {
  if (current_position === END) {
    paths_1.push(parent_path);
    return;
  }

  for (let neighbour_cave of cave_system[current_position]) {
    if (neighbour_cave === START) continue;
    if (isBig(neighbour_cave) || !parent_path.includes(neighbour_cave)) {
      findPaths_1(neighbour_cave, parent_path.concat([neighbour_cave]));
    }
  }
};

// Part 2 variables
let result2;
const paths_2: string[][] = [];
const findPaths_2 = (
  current_position: string,
  parent_path: string[],
  smallTwice: boolean
) => {
  if (current_position === END) {
    paths_2.push(parent_path);
    return;
  }

  for (let neighbour_cave of cave_system[current_position]) {
    if (neighbour_cave === START) continue;
    if (isBig(neighbour_cave) || !parent_path.includes(neighbour_cave)) {
      findPaths_2(
        neighbour_cave,
        parent_path.concat([neighbour_cave]),
        smallTwice
      );
    } else if (!smallTwice) {
      findPaths_2(neighbour_cave, parent_path.concat([neighbour_cave]), true);
    }
  }
};

findPaths_1(START, [START]);
findPaths_2(START, [START], false);

result1 = paths_1.length;
result2 = paths_2.length;

console.log(`Day 12 / Part 1\n\tResult: ${result1}`);
console.log(`Day 12 / Part 2\n\tResult: ${result2}`);
