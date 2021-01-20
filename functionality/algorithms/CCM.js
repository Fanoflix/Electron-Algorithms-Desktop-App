const performance = require('perf_hooks').performance;
export default function minCoinChange(amount, coins) {
  let startTime = performance.now();

  const minCoins = new Array(amount + 1).fill(Infinity);
  minCoins[0] = 0;
  for (let coin of coins) {
    for (let i = 0; i <= amount; i += 1) {
      if (i - coin >= 0)
        minCoins[i] = Math.min(minCoins[i], minCoins[i - coin] + 1);
    }
  }
  let endTime = performance.now();
  let timeTaken = endTime-startTime;
  timeTaken = timeTaken/1000;

  return {
    answer: minCoins[amount] !== Infinity ? minCoins[amount] : -1,
    time : timeTaken
  };
}
