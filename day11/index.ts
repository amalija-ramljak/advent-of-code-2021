import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day11/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map((row) => row.split('').map((e) => parseInt(e)));

// Part 1 variables
let result1 = 0;
let octopi = puzzleInput.slice();

const flashedInStep: Point[] = [];
const hasFlashed = (octopus: Point): boolean => {
  return !!flashedInStep.find(
    (e) => e.row === octopus.row && e.col === octopus.col
  );
};

const getEnergy = (octopus: Point): number => {
  return octopi[octopus.row][octopus.col];
};

const canFlash = (octopus: Point): boolean => {
  return getEnergy(octopus) > 9 && !hasFlashed(octopus);
}

type Point = {
  row: number;
  col: number;
};

const existsNeighbour = (neighbour: Point, sizes: Point): boolean => {
  return (
    neighbour.row >= 0 &&
    neighbour.col >= 0 &&
    neighbour.row < sizes.row &&
    neighbour.col < sizes.col
  );
};

const neighbours = [
  { row: 0, col: 1 },
  { row: 0, col: -1 },
  { row: 1, col: 0 },
  { row: -1, col: 0 },
  { row: 1, col: 1 },
  { row: -1, col: -1 },
  { row: 1, col: -1 },
  { row: -1, col: 1 },
];

const octopiCount = {
  row: puzzleInput.length,
  col: puzzleInput[0].length,
};

let countFlashes = true;
const flashNeighbours = (octopus: Point) => {
  if (countFlashes) {
    result1 += 1;
  }
  const neighbour = { row: 0, col: 0 };
  neighbours.forEach((neighbourDirection) => {
    neighbour.row = octopus.row + neighbourDirection.row;
    neighbour.col = octopus.col + neighbourDirection.col;
    if (existsNeighbour(neighbour, octopiCount)) {
      octopi[neighbour.row][neighbour.col] += 1;
      if (canFlash(neighbour)) {
        flashedInStep.push({ ...neighbour });
        flashNeighbours(neighbour);
      }
    }
  });
};

// Part 2 variables
let result2;

let octo = { row: 0, col: 0 };
for (let step = 1; ; step++) {
  if (step === 101) {
    countFlashes = false;
  }
  flashedInStep.length = 0;
  octopi = octopi.map((row) => row.map((octo) => octo + 1));

  for (let row = 0; row < octopi.length; row++) {
    for (let col = 0; col < octopi[0].length; col++) {
      octo.row = row;
      octo.col = col;
      if (canFlash(octo)) {
        flashedInStep.push({ ...octo });
        flashNeighbours(octo);
      }
    }
  }
  flashedInStep.forEach((octopus) => {
    octopi[octopus.row][octopus.col] = 0;
  });

  if (flashedInStep.length === octopiCount.col * octopiCount.row) {
    result2 = step;
    break;
  }
}

console.log(`Day 11 / Part 1\n\tResult: ${result1}`);
console.log(`Day 11 / Part 2\n\tResult: ${result2}`);
