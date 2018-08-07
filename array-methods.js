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
hundredThousandairs = bal.filter(obj => {
  // console.log('obj', obj.amount > 100000);
  // console.log('obj.amount', obj.amount);
  if (obj.amount > 100000){
    return obj.amount;
  }
});

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
datasetWithRoundedDollar = bal.map(obj => {
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
datasetWithRoundedDime = bal.map(obj => {
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

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;
sumOfBankBalances = bal.reduce((accum, next) => {
  // console.log('accum', accum);
  return Math.round((accum + Number(next.amount))*100)/100;
},0);

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

//*******************
//* object to array *
//* done with ES5   *
//*******************

let arr = [];

let toArr = function (obj) {
  console.log('');
  console.log('obj')
  console.log(obj);
  console.log('');
  console.log('arr start', arr);
  for (let i in obj) {
    console.log('');
    console.log('i', i);
    console.log('obj[i].state', obj[i].state);
    console.log('obj[i].amount', obj[i].amount);
    let state = obj[i].state;
    let amt = Math.round((obj[i].amount)*100)/100;
    arr.push([obj[i].state,amt]);
  }
  // console.log('');
  // console.log('arr end')
  // console.log(arr);
  // console.log('');
  return arr;
}
// console.log('');
// console.log('toArr',toArr(bal));
toArr(bal);

//*****************************
//* array of tuples to object *
//* done with ES5             *
//*****************************

console.log('');
console.log('  ***  START OF .reduce()  ***');
let stateObj = {};

let toObj = arr.reduce((prev, obj, index, next) => {
  console.log('');
  // console.log('prev', prev);
  console.log('obj', obj);
  console.log('  obj[0]', obj[0]);
  console.log('  obj[1]', obj[1]);
  console.log('   index', index);
  // console.log('next', next);
  if (stateObj[obj[0]] === undefined) {
    console.log('   FIRST TIME');
    stateObj[obj[0]] = obj[1];
  }
  else {
    console.log('     ADD MORE');
    console.log('previous', stateObj[obj[0]]);
    console.log('+ obj[1]', obj[1]);
    let sum = stateObj[obj[0]] + obj[1];
    console.log('  =  sum', sum);
    let round = Math.round((sum)*100)/100;
    console.log('   round', round);
    stateObj[obj[0]] = round;
  }
  console.log('stateObj =')
  console.log(stateObj);
  return stateObj;
}, {})
stateSums = stateObj;
// console.log('stateSums', stateSums);
// console.log('toObj', toObj);

// WORKS WITH ForEACH ALSO

// let toObj = arr.forEach(function (obj) {
//   console.log('');
//   console.log('obj', obj);
//   console.log('obj[0]', obj[0]);
//   console.log('obj[1]', obj[1]);

//   if (stateObj[obj[0]] === undefined) {
//     console.log('first time');
//     stateObj[obj[0]] = obj[1];
//   }
//   else {
//     console.log('previous', stateObj[obj[0]]);
//     let accum = stateObj[obj[0]];
//     console.log('accum', accum);
//     console.log('obj[1]', obj[1]);
//     console.log('add more');
//     let sum = accum + obj[1];
//     console.log('sum', sum);
//     let round = Math.round((sum)*100)/100;
//     console.log('round', round);
//     stateObj[obj[0]] = round;
//   }
//   console.log('stateObj', stateObj);
//   return stateObj;
// })
// console.log('');
// stateSums = stateObj;
// console.log('');
// console.log('stateSums')
// console.log(stateSums);

      // doesn't add to existing object value, 
      // instead it replaces existing object value

      // let stateObj = {};
      // let toObj = function (obj) {
      //   console.log('');
      //   console.log('obj', obj);
      //   for (let i in obj) {
      //     stateObj[obj[i][0]] = obj[i][1];
      //   }  
      //   console.log('stateObj', stateObj);
      //   return stateObj;
      // }
      // console.log('');
      // console.log(toObj(arr));

      // // object to array
      // // done with ES6

      // let arr = [];
      // let toArr = bal.filter(obj => {
      //   let amt = Math.round((obj.amount)*100)/100;
      //   arr.push([obj.state,amt]);
      //   return arr;
      // })

      // // array of tuples to object
      // // done with ES6

      // stateSums = arr.reduce((o, [ key, value ]) => {
      //   o[key] = value
      //   return o
      // }, {})

      // console.log('');
      // console.log('arr end')
      // console.log(arr);

      // console.log('stateSums')
      // console.log(stateSums);

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
