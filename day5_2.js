// --- Part Two ---
// The Elves start bringing their spoiled inventory to the trash chute at the back of the kitchen.

// So that they can stop bugging you when they get new inventory, the Elves would like to know all of the IDs that the fresh ingredient ID ranges consider to be fresh. An ingredient ID is still considered fresh if it is in any range.

// Now, the second section of the database (the available ingredient IDs) is irrelevant. Here are the fresh ingredient ID ranges from the above example:

// 3-5
// 10-14
// 16-20
// 12-18
// The ingredient IDs that these ranges consider to be fresh are 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, and 20. So, in this example, the fresh ingredient ID ranges consider a total of 14 ingredient IDs to be fresh.

// Process the database file again. How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?

import { freshnessDatabase } from "./data.js";

const ranges = freshnessDatabase
  .split("\n")
  .filter((line) => line.includes("-"))
  .map((range) => {
    const [start, end] = range.split("-").map((num) => parseInt(num));
    return { start: start, end: end };
  });

function merge(restOfRanges, merges) {
  if (restOfRanges.length === 0) return merges;

  const [first, ...rest] = restOfRanges;

  //get rid of duplications
  if (rest.some((a) => a.start === first.start && a.end === first.end))
    return merge(rest, merges);

  //get rid of nested ranges
  if (rest.some((a) => a.start < first.start && a.end > first.end))
    return merge(rest, merges);

  //merge same starts
  if (rest.some((a) => a.start === first.start)) {
    const [withBiggestEnd, ...redundant] = rest
      .filter((a) => a.start === first.start)
      .sort((a, b) => b.end - a.end);

    const filteredRest = rest.filter(
      (a) =>
        a.start !== first.start ||
        (a.start === withBiggestEnd.start && a.end === withBiggestEnd.end)
    );
    const merged = {
      start: first.start,
      end: Math.max(first.end, withBiggestEnd.end),
    };
    return merge(filteredRest, [merged, ...merges]);
  }

  //merge same ends
  if (rest.some((a) => a.end === first.end)) {
    const [withLowestStart, ...redundant] = rest
      .filter((a) => a.end === first.end)
      .sort((a, b) => a.start - b.start);

    const filteredRest = rest.filter(
      (a) =>
        a.end !== first.end ||
        (a.start === withLowestStart.start && a.end === withLowestStart.end)
    );
    const merged = {
      start: Math.min(first.start, withLowestStart.start),
      end: first.end,
    };
    return merge(filteredRest, [merged, ...merges]);
  }

  //merge end overlap start
  if (rest.some((a) => first.end >= a.start && first.start <= a.start)) {
    const overlapping = rest.filter(
      (a) => first.end >= a.start && first.start <= a.start
    );

    const [withBiggestEnd, ...redundant] = overlapping.sort(
      (a, b) => b.end - a.end
    );

    const filteredRest = rest.filter(
      (a) =>
        !overlapping.some(
          (range) => range.start === a.start && range.end === a.end
        )
    );

    const merged = {
      start: first.start,
      end: Math.max(first.end, withBiggestEnd.end),
    };

    return merge(filteredRest, [merged, ...merges]);
  }

  return merge(rest, [first, ...merges]);
}

function mergePossible(toMerge) {
  const newMerged = merge(toMerge, []);
  if (newMerged.length === toMerge.length) return newMerged;
  return mergePossible(newMerged);
}

console.log(
  mergePossible(ranges, []).reduce((acc, a) => acc + (a.end - a.start + 1), 0)
);
