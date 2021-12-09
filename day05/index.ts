import fs from 'fs';

const puzzleInput = fs
  .readFileSync('day05/my.puzzle.txt', { encoding: 'utf8', flag: 'r' })
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
const get_direction_vector = (start: Point, end: Point): Point => {
  return {
    x: (end.x - start.x) / (Math.abs(end.x - start.x) || 1),
    y: (end.y - start.y) / (Math.abs(end.y - start.y) || 1),
  };
};

const for_condition = (p: Point, direction: Point, end: Point): boolean => {
  if ((direction.x < 0 && p.x < end.x) || (direction.x > 0 && p.x > end.x)) {
    return false;
  }
  if ((direction.y < 0 && p.y < end.y) || (direction.y > 0 && p.y > end.y)) {
    return false;
  }
  return true;
};

// Part 1 variables
let result1 = 0;
// const lines_1 = lines.filter((line) => line.start.x === line.end.x || line.start.y === line.end.y);
const overlaps_1: Overlaps = {};

// Part 2 variables
let result2 = 0;
const overlaps_2: Overlaps = {};

lines.forEach((line) => {
  const direction = get_direction_vector(line.start, line.end);

  for (
    let p = { ...line.start };
    for_condition(p, direction, line.end);
    p.x += direction.x, p.y += direction.y
  ) {
    const overlap_point_key = get_overlap_key(p);
    if (line.start.x === line.end.x || line.start.y === line.end.y) {
      if (overlaps_1[overlap_point_key] !== undefined) {
        overlaps_1[overlap_point_key]++;
      } else {
        overlaps_1[overlap_point_key] = 1;
      }
    }
    if (overlaps_2[overlap_point_key] !== undefined) {
      overlaps_2[overlap_point_key]++;
    } else {
      overlaps_2[overlap_point_key] = 1;
    }
  }
});

for (let overlap_count of Object.values(overlaps_1)) {
  if (overlap_count >= 2) {
    result1++;
  }
}

for (let overlap_count of Object.values(overlaps_2)) {
  if (overlap_count >= 2) {
    result2++;
  }
}

console.log(`Day 5 / Part 1\n\tResult: ${result1}`);
console.log(`Day 5 / Part 2\n\tResult: ${result2}`);
