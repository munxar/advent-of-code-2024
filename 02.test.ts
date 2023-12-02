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

  const total = sets.reduce(
    (sum, { red, green, blue }) => {
      sum.red = Math.max(sum.red, red);
      sum.green = Math.max(sum.green, green);
      sum.blue = Math.max(sum.blue, blue);
      return sum;
    },
    { red: 0, green: 0, blue: 0 }
  );

  return {
    id: parseInt(id),
    possible,
    power: total.red * total.green * total.blue,
  };
};

test("Day 2: Cube Conundrum", () => {
  const games = data.split("\n").map(mapGame);

  const firstResult = games
    .filter((g) => g.possible)
    .reduce((sum, g) => {
      return sum + g.id;
    }, 0);

  expect(firstResult).toBe(2476);

  const secondResult = games.reduce((sum, g) => {
    return sum + g.power;
  }, 0);
  expect(secondResult).toBe(54911);
});
