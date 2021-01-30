/*

Copyright © 30/01/2021, Gonzague DEFRAITEUR
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.

Except as contained in this notice, the name of the <copyright holders> shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the author, Gonzague DEFRAITEUR.

*/
function BinaryToInteger(binString: string)
{
  return (parseInt((binString + '').replace(/[^01]/gi, ''), 2));
}

function IntegerToBinaryArray(value) {
  var binArr = [];
  for (var index = 31; index >= 0; --index) {
    var binKeyIndex = 31 - index;
    var binKey = 1 << binKeyIndex;
    binArr[index] = ((value & binKey) === binKey) ? 1 : 0;
  }
  return binArr;
}

class BinarySortNode {
  parent: BinarySortNode = undefined;
  one: BinarySortNode = undefined;
  zero: BinarySortNode = undefined;
  value: number;
  constructor(parent: BinarySortNode, value: number) {
    this.parent = parent;
    this.value = value;
  }
}

function ComputeTree(parent: BinarySortNode, level: number, binArrays: number[][]) {
  var zeros: number[][] = [];
  var ones: number[][] = [];
  if (level >= 32) {
    return;
  }
  else {

    for (var i = 0; i < binArrays.length; i++) {
      if (binArrays[i][level] == 0) {
        zeros.push(binArrays[i]);
      }
      else {
        ones.push(binArrays[i]);
      }
    }
    if (zeros.length > 0) {
      var newNode = new BinarySortNode(parent, 0);
      parent.zero = newNode;
      ComputeTree(newNode, level + 1, zeros);
    }
    if (ones.length > 0) {
      var newNode = new BinarySortNode(parent, 1);
      parent.one = newNode;
      ComputeTree(newNode, level + 1, ones);
    }
  }
}


// maintenant faut savoir itérer dans l'arbre.

function ReadTreeValues(node: BinarySortNode, resArr: number[], tmpArr: string = "X", level: number = 0) {
  if (tmpArr == "X") {
    tmpArr = "";
  }
  tmpArr = tmpArr.slice();
  if (node.parent != undefined) {
    tmpArr += '' + (node.value);
  }
  if (level == 32) {

    resArr.push(BinaryToInteger(tmpArr));
    return;
  }
  else {
    if (node.zero != undefined) {
      ReadTreeValues(node.zero, resArr, tmpArr, level + 1);
    }
    if (node.one != undefined) {
      ReadTreeValues(node.one, resArr, tmpArr, level + 1);
    }
  }
}

function numberToArrayBuffer(value) {
  const view = new DataView(new ArrayBuffer(16))
  for (var index = 15; index >= 0; --index) {
    view.setUint8(index, value % 256)
    value = value >> 8;
  }
  return view.buffer
}
var array = [];
for (var i = 0; i < 500; i++)
{
  var maxNum = ((1 << 30) - 1);
  var nb = Math.floor(Math.random() * maxNum);
  array.push(nb);
}
console.log("source array: \n" + array);

var binArrays = [];
for (var i = 0; i < array.length; i++) {
  binArrays.push(IntegerToBinaryArray(array[i]));
}
var resArray = [];
var root = new BinarySortNode(undefined, 0);
var d = new Date();
var time = d.getTime();
ComputeTree(root, 0, binArrays);
ReadTreeValues(root, resArray);
var d = new Date();
var timeNow = d.getTime();
console.log('\nres array : \n' + resArray);

console.log("\ntime : " + (timeNow - time));
