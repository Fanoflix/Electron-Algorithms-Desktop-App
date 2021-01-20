const performance = require('perf_hooks').performance;

export default function LongestIncreasingSubsequence(sequence) {

  let startTime = performance.now();

  const lengthsArray = Array(sequence.length).fill(1);

  let previousElementIndex = 0;
  let currentElementIndex = 1;

  while (currentElementIndex < sequence.length) {
    if (sequence[previousElementIndex] < sequence[currentElementIndex]) {
      const newLength = lengthsArray[previousElementIndex] + 1;
      if (newLength > lengthsArray[currentElementIndex]) {
        lengthsArray[currentElementIndex] = newLength;
      }
    }

    previousElementIndex += 1;

    if (previousElementIndex === currentElementIndex) {
      currentElementIndex += 1;
      previousElementIndex = 0;
    }
  }
  let longestIncreasingLength = 0;

  for (let i = 0; i < lengthsArray.length; i += 1) {
    if (lengthsArray[i] > longestIncreasingLength) {
      longestIncreasingLength = lengthsArray[i];
    }
  }

  let endTime = performance.now();
  let timeTaken = endTime-startTime;
  timeTaken = timeTaken/1000;
  
  return {
    answer: longestIncreasingLength,
    time: timeTaken
  };
}
