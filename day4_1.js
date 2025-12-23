// --- Day 4: Printing Department ---
// You ride the escalator down to the printing department. They're clearly getting ready for Christmas; they have lots of large rolls of paper everywhere, and there's even a massive printer in the corner (to handle the really big print jobs).

// Decorating here will be easy: they can make their own decorations. What you really need is a way to get further into the North Pole base while the elevators are offline.

// "Actually, maybe we can help with that," one of the Elves replies when you ask for help. "We're pretty sure there's a cafeteria on the other side of the back wall. If we could break through the wall, you'd be able to keep moving. It's too bad all of our forklifts are so busy moving those big rolls of paper around."

// If you can optimize the work the forklifts are doing, maybe they would have time to spare to break through the wall.

// The rolls of paper (@) are arranged on a large grid; the Elves even have a helpful diagram (your puzzle input) indicating where everything is located.

// For example:

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
// The forklifts can only access a roll of paper if there are fewer than four rolls of paper in the eight adjacent positions. If you can figure out which rolls of paper the forklifts can access, they'll spend less time looking and more time breaking down the wall to the cafeteria.

// In this example, there are 13 rolls of paper that can be accessed by a forklift (marked with x):

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
// Consider your complete diagram of the paper roll locations. How many rolls of paper can be accessed by a forklift?

import { paperRolls } from "./data.js";

const paperRollsLinesAsNumbers = paperRolls.split("\n").map((line) => {
  return line.split("").map((a) => {
    if (a === "@") return 1;
    return 0;
  });
});

function countAccessibleRollsInLine(previousLine, currentLine, nextLine) {
  return currentLine.entries().reduce((acc, [index, currentValue]) => {
    if (currentValue !== 1) return acc;

    let numberOfClosestRolls = 0;

    numberOfClosestRolls +=
      (currentLine[index - 1] ? currentLine[index - 1] : 0) +
      (currentLine[index + 1] ? currentLine[index + 1] : 0);

    if (previousLine.length > 0) {
      numberOfClosestRolls +=
        (previousLine[index - 1] ? previousLine[index - 1] : 0) +
        (previousLine[index] ? previousLine[index] : 0) +
        (previousLine[index + 1] ? previousLine[index + 1] : 0);
    }

    if (nextLine.length > 0) {
      numberOfClosestRolls +=
        (nextLine[index - 1] ? nextLine[index - 1] : 0) +
        (nextLine[index] ? nextLine[index] : 0) +
        (nextLine[index + 1] ? nextLine[index + 1] : 0);
    }

    if (numberOfClosestRolls > 3) {
      return acc;
    }

    return acc + 1;
  }, 0);
}

function countAccessibleRolls(allLines) {
  return allLines
    .entries()
    .map(([index, currentLine]) => {
      return countAccessibleRollsInLine(
        allLines[index - 1] ? allLines[index - 1] : [],
        currentLine,
        allLines[index + 1] ? allLines[index + 1] : []
      );
    })
    .reduce((acc, a) => acc + a);
}

console.log(countAccessibleRolls(paperRollsLinesAsNumbers));
