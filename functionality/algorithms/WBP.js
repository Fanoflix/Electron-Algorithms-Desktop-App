const performance = require('perf_hooks').performance;

export default function wordBreak(s, wordDict) {
  var dp = Array(s.length);
  var map = {};
  var res = [];

  let startTime = performance.now();

  for (var i = 0; i < wordDict.length; i++) {
    map[wordDict[i]] = true;
  }

  let result = find(s, map, dp, 0);

  let endTime = performance.now();
  let timeTaken = endTime-startTime;
  timeTaken = timeTaken/1000;

  if (result.length !== 0 ) {
    return {
      answer : result,
      time : timeTaken
    }
  }
  else { 
    return {
      answer : 'Cannot break Word',
      time : timeTaken
    }
  }
  
};

var find = function (s, map, dp, index) {
  if (dp[index]) return dp[index];

  var str = '';
  var tmp = null;
  var len = s.length;

  dp[index] = [];

  for (var i = index; i < len; i++) {
    str = s.substring(index, i + 1);
    if (!map[str]) continue;
    if (i === len - 1) {
      dp[index].push(str);
      break;
    }
    tmp = find(s, map, dp, i + 1);
    for (var j = 0; j < tmp.length; j++) {
      dp[index].push(str + ' ' + tmp[j]);
    }
  }

  return dp[index];
  
};