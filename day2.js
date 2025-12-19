import { ranges } from "./data.js";

const rangesStrings = ranges.split(",");
const ignoredNumber = "010";

function checkIfNumberIsMirrored(numberString) {
  return (
    numberString.slice(0, Math.floor(numberString.length / 2)) ===
    numberString.slice(Math.floor(numberString.length / 2))
  );
}

function countInvalidNumbersInRange(rangeString) {
  const [start, end] = rangeString.split("-").map((num) => parseInt(num));
  let invalidNumbersCount = 0;

  for (let number = start; number <= end; number++) {
    const numberString = number.toString();
    if (
      numberString !== ignoredNumber &&
      checkIfNumberIsMirrored(numberString)
    ) {
      invalidNumbersCount += parseInt(numberString);
    }
  }

  return invalidNumbersCount;
}

const result = rangesStrings.reduce(
  (acc, rangeString) => acc + countInvalidNumbersInRange(rangeString),
  0
);

// ANSWER:
console.log(result);
