import * as data from "./data.js";

const numbers = Array.from({ length: 100 }, (_, i) => i);
const rotationsStrings = data.rotations.split("\n");

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
