export default function RodCutting(prices, rLen) {
  //define base on rod length and its revenue
  var r = [];
  r[0] = 0;

  //loop through the different lengths and determine max revenue
  for(var i = 1; i <= rLen; i++) {
      //define a var to store the current max returned from recursion.
      var currentMaxRevenue = 0;
      for(var j = 1; j <= i; j++) {
          var currentRevenue = prices[j - 1] + r[i - j];
          if (currentRevenue > currentMaxRevenue) {
              currentMaxRevenue = currentRevenue;
          }
      }
      r[i] = currentMaxRevenue;
  }
  //finally return the max rev
  return r[rLen];
}