export const frequencyCounter = (arr) => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
};
