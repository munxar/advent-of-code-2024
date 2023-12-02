import text from "./data/01.txt";
import { test, expect } from "bun:test";

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const toNumber = (line: string) => {
  const first = { digit: 0, index: line.length };
  const last = { digit: 0, index: -1 };

  digits.forEach((text, digit) => {
    const indexText = line.indexOf(text);
    if (indexText !== -1 && indexText < first.index) {
      first.index = indexText;
      first.digit = digit + 1;
    }
    const indexNumber = line.indexOf(`${digit + 1}`);
    if (indexNumber !== -1 && indexNumber < first.index) {
      first.index = indexNumber;
      first.digit = digit + 1;
    }

    const indexTextLast = line.lastIndexOf(text);
    if (indexTextLast !== -1 && indexTextLast > last.index) {
      last.index = indexTextLast;
      last.digit = digit + 1;
    }
    const indexNumberLast = line.lastIndexOf(`${digit + 1}`);
    if (indexNumberLast !== -1 && indexNumberLast > last.index) {
      last.index = indexNumberLast;
      last.digit = digit + 1;
    }
  });

  return first.digit * 10 + last.digit;
};

test("Day 1: Trebuchet?!", () => {
  const result = text
    .split("\n")
    .map(toNumber)
    .reduce((sum: number, v: number) => sum + v, 0);

  expect(result).toBe(54431);
});
