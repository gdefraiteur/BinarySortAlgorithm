/*

Copyright © 30/01/2021, Gonzague DEFRAITEUR
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.

Except as contained in this notice, the name of the <copyright holders> shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the author, Gonzague DEFRAITEUR.

*/

function SortDirectly(array: number[], resArr: number[], level: number = 0)
{
  var zeros: number[] = [];
  var ones: number[] = [];
  var hasZeros: boolean = false;
  var hasOnes: boolean = false;
  for (var i = 0; i < array.length; i++)
  {
    var binKeyIndex = 31 - level;
    var binKey = 1 << binKeyIndex;
    var zeroOne = ((array[i] & binKey) === binKey) ? 1 : 0;
    if (zeroOne == 1)
    {
      hasOnes = true;
      ones.push(array[i]);
    }
    else
    {
        hasZeros = true;
      zeros.push(array[i]);
    }
  }
  if (level == 32)
  {
    resArr.push(array[0]);
  }
  else
  {
    if (hasZeros) {
      SortDirectly(zeros, resArr, level + 1);
    }
    if (hasOnes != undefined) {
      SortDirectly(ones, resArr, level + 1);
    }
  }
}

var array = [];
for (var i = 0; i < 10005000; i++)
{
  var maxNum = ((1 << 30) - 1);
  var nb = Math.floor(Math.random() * maxNum);
  array.push(nb);
}

var resArr = [];
var d = new Date();
var time = d.getTime();
SortDirectly(array, resArr);
var d = new Date();
var timeNow = d.getTime();
console.log("time: " + (timeNow - time));

var d = new Date();
var timeNow = d.getTime();

array.sort((a, b) => { return (a - b)});
var d = new Date();
var newtime = d.getTime();
console.log("\n time for standard sort: " + (newtime - timeNow));