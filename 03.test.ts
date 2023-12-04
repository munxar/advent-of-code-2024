import data from "./data/03.txt";
import { test, expect } from "bun:test";

test("Day 3: Gear Ratios", () => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const space = ".";
  const rows = data.split("\n");

  const cells = rows
    .map((row, y) => {
      let value = "";
      let cells = [];
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (digits.includes(char)) {
          value += char;
        } else {
          cells.push({
            left: i - value.length - 1,
            top: y - 1,
            right: i,
            bottom: y + 1,
            value: value,
          });
          value = "";
        }
      }
      if (value !== "") {
        cells.push({
          left: row.length - 1 - value.length - 1,
          top: y - 1,
          right: row.length - 1,
          bottom: y + 1,
          value: value,
        });
      }

      return cells;
    })
    .flat()
    .filter((c) => c.value !== "");

  const gears = [] as {
    top: number;
    left: number;
    right: number;
    bottom: number;
    value: string;
  }[][];

  rows.forEach((row, y) => {
    row.split("").forEach((value, x) => {
      if (value === "*") {
        const gear = cells.filter((cell) => {
          return (
            cell.left <= x &&
            x <= cell.right &&
            cell.top <= y &&
            y <= cell.bottom
          );
        });
        gears.push(gear);
      }
    });
  });

  const res = gears
    .filter((g) => g.length >= 2)
    .map((gear) => gear.reduce((prod, g) => prod * parseInt(g.value), 1))
    .reduce((sum, v) => sum + v, 0);
  expect(res).toBe(75220503);
});
