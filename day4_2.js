// --- Part Two ---
// Now, the Elves just need help accessing as much of the paper as they can.

// Once a roll of paper can be accessed by a forklift, it can be removed. Once a roll of paper is removed, the forklifts might be able to access more rolls of paper, which they might also be able to remove. How many total rolls of paper could the Elves remove if they keep repeating this process?

// Starting with the same example as above, here is one way you could remove as many rolls of paper as possible, using highlighted @ to indicate that a roll of paper is about to be removed, and using x to indicate that a roll of paper was just removed:

// Initial state:
// ..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.

// Remove 13 rolls of paper:
// ..xx.xx@x.
// x@@.@.@.@@
// @@@@@.x.@@
// @.@@@@..@.
// x@.@@@@.@x
// .@@@@@@@.@
// .@.@.@.@@@
// x.@@@.@@@@
// .@@@@@@@@.
// x.x.@@@.x.

// Remove 12 rolls of paper:
// .......x..
// .@@.x.x.@x
// x@@@@...@@
// x.@@@@..x.
// .@.@@@@.x.
// .x@@@@@@.x
// .x.@.@.@@@
// ..@@@.@@@@
// .x@@@@@@@.
// ....@@@...

// Remove 7 rolls of paper:
// ..........
// .x@.....x.
// .@@@@...xx
// ..@@@@....
// .x.@@@@...
// ..@@@@@@..
// ...@.@.@@x
// ..@@@.@@@@
// ..x@@@@@@.
// ....@@@...

// Remove 5 rolls of paper:
// ..........
// ..x.......
// .x@@@.....
// ..@@@@....
// ...@@@@...
// ..x@@@@@..
// ...@.@.@@.
// ..x@@.@@@x
// ...@@@@@@.
// ....@@@...

// Remove 2 rolls of paper:
// ..........
// ..........
// ..x@@.....
// ..@@@@....
// ...@@@@...
// ...@@@@@..
// ...@.@.@@.
// ...@@.@@@.
// ...@@@@@x.
// ....@@@...

// Remove 1 roll of paper:
// ..........
// ..........
// ...@@.....
// ..x@@@....
// ...@@@@...
// ...@@@@@..
// ...@.@.@@.
// ...@@.@@@.
// ...@@@@@..
// ....@@@...

// Remove 1 roll of paper:
// ..........
// ..........
// ...x@.....
// ...@@@....
// ...@@@@...
// ...@@@@@..
// ...@.@.@@.
// ...@@.@@@.
// ...@@@@@..
// ....@@@...

// Remove 1 roll of paper:
// ..........
// ..........
// ....x.....
// ...@@@....
// ...@@@@...
// ...@@@@@..
// ...@.@.@@.
// ...@@.@@@.
// ...@@@@@..
// ....@@@...

// Remove 1 roll of paper:
// ..........
// ..........
// ..........
// ...x@@....
// ...@@@@...
// ...@@@@@..
// ...@.@.@@.
// ...@@.@@@.
// ...@@@@@..
// ....@@@...
// Stop once no more rolls of paper are accessible by a forklift. In this example, a total of 43 rolls of paper can be removed.

// Start with your original diagram. How many rolls of paper in total can be removed by the Elves and their forklifts?

import { paperRolls } from "./data.js";

const paperRollsLines = paperRolls.split("\n");

function removeRolls(previousLine, currentLine, nextLine) {
  let removed = 0;
  let updatedLine = currentLine
    .split("")
    .map((currentValue, index) => {
      if (currentValue === "x" || currentValue === ".") return currentValue;

      let numberOfClosestRolls = 0;

      if (currentLine[index - 1] === "@") numberOfClosestRolls += 1;
      if (currentLine[index + 1] === "@") numberOfClosestRolls += 1;

      if (previousLine.length > 0) {
        if (previousLine[index - 1] === "@") numberOfClosestRolls += 1;
        if (previousLine[index] === "@") numberOfClosestRolls += 1;
        if (previousLine[index + 1] === "@") numberOfClosestRolls += 1;
      }

      if (nextLine.length > 0) {
        if (nextLine[index - 1] === "@") numberOfClosestRolls += 1;
        if (nextLine[index] === "@") numberOfClosestRolls += 1;
        if (nextLine[index + 1] === "@") numberOfClosestRolls += 1;
      }

      if (numberOfClosestRolls > 3) {
        return currentValue;
      }

      removed += 1;
      return "x";
    })
    .reduce((acc, a) => `${acc}${a}`);

  return [removed, updatedLine];
}

function countRemovedRolls(counter, allLines) {
  let rollsRemoved = 0;

  let updatedRolls = allLines.map((currentLine, index) => {
    const [removed, updatedLine] = removeRolls(
      allLines[index - 1] ? allLines[index - 1] : [],
      currentLine,
      allLines[index + 1] ? allLines[index + 1] : []
    );
    rollsRemoved += removed;
    return updatedLine;
  });

  if (rollsRemoved === 0) return counter;

  return countRemovedRolls(counter + rollsRemoved, updatedRolls);
}

console.log(countRemovedRolls(0, paperRollsLines));
