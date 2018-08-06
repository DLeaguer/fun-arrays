var dataset = require('./dataset.json');
// console.log('json', dataset);
// console.log('amt', dataset.amount);
// console.log('bal', dataset.bankBalances);
// console.log('bal amt', dataset.bankBalances[0].amount);
let bal = dataset.bankBalances;
// console.log('bal', bal);

// const getAmount = (elem) => elem.amount > 100000;
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;
const highAmts = bal.filter(obj => {
  // console.log('obj', obj.amount > 100000);
  // console.log('obj.amount', obj.amount);
  if (obj.amount > 100000){
    return obj.amount;
  }
});

hundredThousandairs = highAmts;

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;
const newObj = bal.map(obj => {
  let round = 0;
  if (obj.amount - Math.floor(obj.amount) >= .5) {
    round = Math.ceil(obj.amount);
  }else {
    round = Math.floor(obj.amount);
  }
  return {
    'amount': obj.amount,
    'state': obj.state,
    'rounded': round
  }
})

datasetWithRoundedDollar = newObj;

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;
let newObj2 = bal.map(obj => {
  let round = 0;
  if (obj.amount*10 - Math.floor(obj.amount*10) >= .5) {
    round = Math.ceil(obj.amount*10);
  }else {
    round = Math.floor(obj.amount*10);
  }
  let newround = round/10;
  return {
    'amount': obj.amount,
    'state': obj.state,
    'roundedDime': newround
  }
})

datasetWithRoundedDime = newObj2;

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;
let total = bal.reduce((accum, next) => {
  // console.log('accum', accum);
  return Math.round((accum + Number(next.amount))*100)/100;
},0);

sumOfBankBalances = total;

/*
  from each of the following states:
    Wisconsin WI
    Illinois IL
    Wyoming WY
    Ohio OH
    Georgia GA
    Delaware DE
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;
sumOfInterests = bal.filter(obj => {
  if (obj.state === 'WI' || obj.state === 'IL' || obj.state === 'WY' || obj.state === 'OH' || obj.state === 'GA' || obj.state === 'DE') {
    // console.log('obj.state', obj.state);
    // console.log('obj.amount', obj.amount);
    // console.log(obj.amount*0.189);
    return Math.round((obj.amount * .189)*100)/100
  }
}).reduce((accum, next) => {
  return Math.round((accum + Number(next.amount*.189))*100)/100;
},0)
console.log(sumOfInterests);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = null;

// function hashtbl(obj)
// {
//   this.length = 0;
//   this.items = {};
//   for (var p in obj) {
//       if (obj.hasOwnProperty(p)) {
//           this.items[p] = obj[p];
//           this.length++;
//       }
//   }
  // this.setItem = function(key, value) {
  //   let previous = undefined;
  //   if (this.items.hasOwnProperty(key)) {
  //     previous = this.items[key];
  //   }
  //   else {
  //     this.length++;
  //   }
  //   this.items[key] = value;
  //   return previous;
  // }
  // this.getItem = function (key) {
  //   if (this.items.hasOwnProperty(key)) {
  //     return this.items[key];
  //   }
  //   else {
  //     return undefined;
  //   }
  // }
  // this.keys = function () {
  //   let keys = [];
  //   for (let k in this.items) {
  //     if (this.items.hasOwnProperty(k)) {
  //       keys.push(k);
  //     }
  //   }
  //   return keys;
  // }
  // this.values = function () {
  //   let values = [];
  //   for (let k in this.items) {
  //     if (this.items.hasOwnProperty(k)) {
  //       values.push(this.items[k]);
  //     }
  //   }
  //   return values;
  // }
  // this.each = function(fn) {
  //   for (let k in this.items) {
  //     if (this.items.hasOwnProperty(k)) {
  //       fn(k, this.items[k]);
  //     }
  //   }
  // }
  // this.clear = function() {
  //   this.items = {}
  //   this.length = 0;
  // }
// }

// let h = new hashtbl(bal);
// console.log(h);

stateSums = bal.filter(obj => {
  
  for (let k in obj) {
    // let amt = Number(Math.round((obj.amount)*10)/10);
    // console.log('amt', amt);
    let amt = Number(Math.round((obj[k])*10)/10);
    console.log('amt', amt);
    let state = obj[k];
    let result = {
      state : amt
    }
    console.log('result', result);
    return result;
  }
}).reduce((accum, next) => {
  for (let k in next.state) {
    amt = Math.round((accum + Number(next.amount))*10)/10;
    let state = next[k];
    let result = {
      state:next.amt
    }
    console.log('2nd result', result);
    return result;
  }
},0)
console.log(stateSums);

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
