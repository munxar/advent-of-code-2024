import data from "./data/04.txt";
import { test, expect } from "bun:test";

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
  expect(res).toBe(13768818);
});
