/*

Copyright © 30/01/2021, Gonzague DEFRAITEUR
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.

Except as contained in this notice, the name of the <copyright holders> shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the author, Gonzague DEFRAITEUR.

*/

function SortDirectly(arrayLen: number, array: number[], resArr: number[], level: number = 0)
{
  var zeros: number[] = [];
  var ones: number[] = [];
  var zeroLen: number = 0;
  var oneLen: number = 0;
  var binKeyIndex = 31 - level;
  var binKey = 1 << binKeyIndex;
  for (var i = 0; i < arrayLen; i++)
  {
    if (((array[i] & binKey) === binKey))
    {
      oneLen++;
      ones.push(array[i]);
    }
    else
    {
      zeroLen++;
      zeros.push(array[i]);
    }
  }
  if (level == 32)
  {
    resArr.push(array[0]);
  }
  else
  {
    if (zeroLen > 0) {
      SortDirectly(zeroLen, zeros, resArr, level + 1);
    }
    if (oneLen > 0) {
      SortDirectly(oneLen, ones, resArr, level + 1);
    }
  }
}
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}
// first call to quick sort
//var sortedArray = quickSort(items, 0, items.length - 1);
//console.log(sortedArray); //prints [2,3,5,6,7,9]


var array = [];

for (var i = 0; i < 5000000; i++)
{
  var maxNum = ((1 << 30) - 1);
  var nb = Math.floor(Math.random() * maxNum);
  array.push(nb);
}
var arr_len =  array.length;
var resArr = [];
var d = new Date();
var time = d.getTime();
SortDirectly(arr_len, array, resArr);
var d = new Date();
var timeNow = d.getTime();
console.log("time: " + (timeNow - time));

var d = new Date();
var slice = array.slice();
var timeNow = d.getTime();

slice.sort((a, b) => { return (a - b)});
var d = new Date();
var newtime = d.getTime();
console.log("\n time for standard sort: " + (newtime - timeNow));

var slice = array.slice();
var timeNow = d.getTime();
quickSort(slice, 0, slice.length - 1);
var newtime = d.getTime();
console.log("\n time for quicksort: " + (newtime - timeNow));
