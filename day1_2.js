// --- Part Two ---
// You're sure that's the right password, but the door won't open. You knock, but nobody answers. You build a snowman while you think.

// As you're rolling the snowballs for your snowman, you find another security document that must have fallen into the snow:

// "Due to newer security protocols, please use password method 0x434C49434B until further notice."

// You remember from the training seminar that "method 0x434C49434B" means you're actually supposed to count the number of times any click causes the dial to point at 0, regardless of whether it happens during a rotation or at the end of one.

// Following the same rotations as in the above example, the dial points at zero a few extra times during its rotations:

// The dial starts by pointing at 50.
// The dial is rotated L68 to point at 82; during this rotation, it points at 0 once.
// The dial is rotated L30 to point at 52.
// The dial is rotated R48 to point at 0.
// The dial is rotated L5 to point at 95.
// The dial is rotated R60 to point at 55; during this rotation, it points at 0 once.
// The dial is rotated L55 to point at 0.
// The dial is rotated L1 to point at 99.
// The dial is rotated L99 to point at 0.
// The dial is rotated R14 to point at 14.
// The dial is rotated L82 to point at 32; during this rotation, it points at 0 once.
// In this example, the dial points at 0 three times at the end of a rotation, plus three more times during a rotation. So, in this example, the new password would be 6.

// Be careful: if the dial were pointing at 50, a single rotation like R1000 would cause the dial to point at 0 ten times before returning back to 50!

// Using password method 0x434C49434B, what is the password to open the door?

import { rotations } from "./data.js";

const numbers = Array.from({ length: 100 }, (_, i) => i);
const rotationsStrings = rotations.split("\n");

function rotate(currentPosition, rotation) {
  let newPosition = currentPosition + rotation;
  if (newPosition < 0) return newPosition + numbers.length;
  if (newPosition > 99) return newPosition - numbers.length;
  return newPosition;
}

function countStopsAtZero(rotations) {
  let currentPosition = 50;
  let stopsAtZero = 0;
  for (const rotation of rotations) {
    let rotationValue;
    if (rotation.startsWith("L")) {
      rotationValue = -parseInt(rotation.slice(1));
    }
    if (rotation.startsWith("R")) {
      rotationValue = parseInt(rotation.slice(1));
    }

    while (rotationValue < -99) rotationValue += 100;

    while (rotationValue > 99) rotationValue -= 100;

    currentPosition = rotate(currentPosition, rotationValue);

    if (currentPosition === 0) stopsAtZero += 1;
  }
  return stopsAtZero;
}

function countCrossesOverZero(rotations) {
  let currentPosition = 50;
  let crossesOverZero = 0;

  for (const rotation of rotations) {
    let rotationValue;

    if (rotation.startsWith("L")) {
      rotationValue = -parseInt(rotation.slice(1));
      crossesOverZero += Math.floor(Math.abs(rotationValue) / 100);
      while (rotationValue < -99) rotationValue += 100;
      if (
        rotate(currentPosition, rotationValue) > currentPosition &&
        currentPosition !== 0
      )
        crossesOverZero += 1;
    }

    if (rotation.startsWith("R")) {
      rotationValue = parseInt(rotation.slice(1));
      crossesOverZero += Math.floor(rotationValue / 100);
      while (rotationValue > 99) rotationValue -= 100;
      if (
        rotate(currentPosition, rotationValue) < currentPosition &&
        rotate(currentPosition, rotationValue) !== 0
      )
        crossesOverZero += 1;
    }

    currentPosition = rotate(currentPosition, rotationValue);
  }

  return crossesOverZero;
}

//ANSWER:
console.log(
  countStopsAtZero(rotationsStrings) + countCrossesOverZero(rotationsStrings)
);
