import data from "./data/05.txt";
import { test, expect } from "bun:test";

const datax = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const mapFn = (ranges: number[][]) => {
  return (v: number) => {
    const range = ranges.find((r) => {
      return r[1] <= v && v <= r[1] + r[2];
    });
    if (range) {
      return range[0] + (v - range[1]);
    } else {
      return v;
    }
  };
};

test("Day 5: If You Give A Seed A Fertilizer", () => {
  const [header, ...lines] = data.split("\n\n");
  const seedsPre = header
    .split(":")[1]
    .split(" ")
    .filter((v) => v !== "")
    .map((v) => parseInt(v));

  const seeds = seedsPre;

  const rows = lines.map((line) => {
    const ranges = line
      .split(":")[1]
      .split("\n")
      .filter((l) => l !== "")
      .map((v) => v.split(" ").map((w) => parseInt(w)));
    return { ranges, fn: mapFn(ranges) };
  });

  const result = [79, 14, 55, 13].map((v) => rows[0].fn(v));
  let tmp = seeds;
  for (let i = 0; i < rows.length; i++) {
    tmp = tmp.map((v) => rows[i].fn(v));
  }
  const min = Math.min(...tmp);
  expect(min).toBe(265018614);
});
