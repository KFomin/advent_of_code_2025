import * as data from "./data.js";

const numbers = Array.from({ length: 100 }, (_, i) => i);
const rotationsStrings = data.rotations.split("\n");
let currentPosition = 50;
let password = 0;

function rotate(currentPosition, rotation) {
  let newPosition = currentPosition + rotation;
  if (newPosition < 0) return newPosition + numbers.length;
  if (newPosition > 99) return newPosition - numbers.length;
  return newPosition;
}

for (const rotation of rotationsStrings) {
  let rotationValue;
  if (rotation.startsWith("L")) {
    rotationValue = -parseInt(rotation.slice(1));
  }
  if (rotation.startsWith("R")) {
    rotationValue = parseInt(rotation.slice(1));
  }

  while (rotationValue < -99) rotationValue += 100;

  while (rotationValue > 99) rotationValue -= 100;

  console.log(rotationValue);
  currentPosition = rotate(currentPosition, rotationValue);

  if (currentPosition === 0) password += 1;
}

console.log(password);
