import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day05/puzzleInput.txt', { encoding: 'utf8', flag: 'r' })
  .split('\n');

type Point = {
  x: number;
  y: number;
};
type LineType = {
  start: Point;
  end: Point;
};
const lines: LineType[] = [];

puzzleInput.forEach((line_definition) => {
  const [start, end] = line_definition.split(' -> ');
  const [start_x, start_y] = start.split(',');
  const [end_x, end_y] = end.split(',');

  lines.push({
    start: {
      x: parseInt(start_x),
      y: parseInt(start_y),
    },
    end: {
      x: parseInt(end_x),
      y: parseInt(end_y),
    },
  });
});

type Overlaps = Record<string, number>;
const get_overlap_key = (point: Point): string => `${point.x},${point.y}`;
const smaller_bigger_h_point = (point1: Point, point2: Point): Point[] =>
  point1.y < point2.y ? [point1, point2] : [point2, point1];
const smaller_bigger_v_point = (point1: Point, point2: Point): Point[] =>
  point1.x < point2.x ? [point1, point2] : [point2, point1];

// Part 1 variables
let result1 = 0;
const lines_1 = lines.filter((line) => line.start.x === line.end.x || line.start.y === line.end.y);
const overlaps_1: Overlaps = {};

// Part 2 variables
let result2;

lines_1.forEach((line) => {
  const isHorizontal = line.start.x === line.end.x;
  const isVertical = line.start.y === line.end.y;
  const [start, end] = isHorizontal
    ? smaller_bigger_h_point(line.start, line.end)
    : smaller_bigger_v_point(line.start, line.end);

  let p = isHorizontal ? start.y : start.x;
  for (p; isHorizontal ? p <= end.y : p <= end.x; p++) {
    const overlap_point_key = get_overlap_key({
      x: isHorizontal ? start.x : p,
      y: isHorizontal ? p : start.y,
    });
    if (overlaps_1[overlap_point_key] !== undefined) {
      overlaps_1[overlap_point_key]++;
    } else {
      overlaps_1[overlap_point_key] = 1;
    }
  }
});

for (let overlap_count of Object.values(overlaps_1)) {
  if (overlap_count >= 2) {
    result1++;
  }
}

console.log(`Day 5 / Part 1\n\tResult: ${result1}`);
console.log(`Day 5 / Part 2\n\tResult: ${result2}`);
