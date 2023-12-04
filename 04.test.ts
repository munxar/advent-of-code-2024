//import data from "./data/04.txt";
import { test, expect } from "bun:test";
const data = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

test("Day 4: Scratchcards", () => {
  const rows = data.split("\n").map((row) => {
    const [_, d] = row.split(":");

    const [w, n] = d.split("|");

    return {
      winning: w
        .split(" ")
        .filter((v) => v !== "")
        .map((v) => parseInt(v)),
      numbers: n
        .split(" ")
        .filter((v) => v !== "")
        .map((v) => parseInt(v)),
    };
  });
  const cards = rows.map((row) => {
    let s = 0;

    row.numbers.forEach((number) => {
      if (row.winning.includes(number)) {
        s++;
      }
    });

    return { winning: s, copy: 1 };
  });

  cards.forEach((card, i) => {
    for (let j = i + 1; j <= i + card.winning; j++) {
      cards[j].copy += card.copy;
    }
  });
  const res = cards.reduce((sum, v) => sum + v.copy, 0);
  expect(res).toBe(30);
});
