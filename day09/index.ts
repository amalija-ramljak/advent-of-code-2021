import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day09/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n')
  .map((cave) => cave.split('').map((point) => parseInt(point)));

type Point = {
  x: number;
  y: number;
};

const rows = puzzleInput.length;
const cols = puzzleInput[0].length;
const checkExistence = ({ x, y }: Point): boolean => {
  if (x < 0 || y < 0 || y >= rows || x >= cols) {
    return false;
  }
  return true;
};

// Part 1 variables
let result1 = 0;
const adjacentDirections = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

// Part 2 variables
let result2;
const basins: number[] = [];

const getBasinNeighbours = (
  startingPoint: Point,
  currentBasin: Point[]
): Point[] => {
  for (let direction of adjacentDirections) {
    let neighbour = {
      x: startingPoint.x + direction.x,
      y: startingPoint.y + direction.y,
    };
    if (
      checkExistence(neighbour) &&
      puzzleInput[neighbour.y][neighbour.x] < 9 &&
      !currentBasin.find(
        (point) => point.x === neighbour.x && point.y === neighbour.y
      )
    ) {
      currentBasin.push(neighbour);
      currentBasin = getBasinNeighbours(neighbour, currentBasin);
    }
  }
  return currentBasin;
};

let isLowPoint: boolean;
let neighbour: Point = {
  x: 0,
  y: 0,
};
let basin: Point[] = [];
puzzleInput.forEach((row, current_y) => {
  row.forEach((pointHeight: number, current_x) => {
    isLowPoint = true;
    for (let directionVector of adjacentDirections) {
      neighbour.x = current_x + directionVector.x;
      neighbour.y = current_y + directionVector.y;
      if (
        checkExistence(neighbour) &&
        pointHeight >= puzzleInput[neighbour.y][neighbour.x]
      ) {
        isLowPoint = false;
        break;
      }
    }

    if (isLowPoint) {
      result1 += 1 + pointHeight;

      neighbour.x = current_x;
      neighbour.y = current_y;

      basin = getBasinNeighbours(neighbour, [neighbour]);
      basins.push(basin.length);
    }
  });
});

basins.sort((a, b) => b - a);

result2 = basins[0] * basins[1] * basins[2];

console.log(`Day 9 / Part 1\n\tResult: ${result1}`);
console.log(`Day 9 / Part 2\n\tResult: ${result2}`);
