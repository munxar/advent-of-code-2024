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
    .filter((c) => c.value !== "")
    .filter((c) => {
      const values = [];
      for (let j = c.top; j <= c.bottom; j++) {
        const row = rows[j] || [];
        for (let i = c.left; i <= c.right; i++) {
          values.push(row[i] || space);
        }
      }

      const res = values.some(
        (value) => !(digits.includes(value) || value === space)
      );

      return res;
    });

  const sum = cells
    .map((c) => parseInt(c.value))
    .reduce((sum, v) => sum + v, 0);

  expect(sum).toBe(509115);
});
