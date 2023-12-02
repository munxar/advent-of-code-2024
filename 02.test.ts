import data from "./data/02.txt";
import { test, expect } from "bun:test";

const mapGame = (line: string) => {
  const [header, games] = line.split(":");
  const [_, id] = header.split(" ");

  const sets = games.split(";").map((g) =>
    g
      .split(",")
      .map((v) => v.trim())
      .reduce(
        (obj, cubes) => {
          const [count, color] = cubes.split(" ");
          obj[color] = parseInt(count);
          return obj;
        },
        { red: 0, green: 0, blue: 0 }
      )
  );
  const possible = sets.every(({ red, green, blue }) => {
    return red <= 12 && green <= 13 && blue <= 14;
  });

  return {
    id: parseInt(id),
    possible,
  };
};

test("Day 2: Cube Conundrum", () => {
  const result = data
    .split("\n")
    .map(mapGame)
    .filter((g) => g.possible)
    .reduce((sum, g) => {
      return sum + g.id;
    }, 0);

  expect(result).toBe(2476);
});
