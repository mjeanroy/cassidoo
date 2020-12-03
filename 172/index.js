/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Given an array of integers and a target value, return the number of pairs of array elements that have a difference equal to a target value.
 *
 *
 * Examples:
 *   arrayDiff([1, 2, 3, 4], 1)
 *   3 // 2 - 1 = 1, 3 - 2 = 1, and 4 - 3 = 1
 *
 * @param {*} array 
 * @param {*} diff 
 */
module.exports = function arrayDiff(array, diff) {
  const size = array.length;
  if (size === 0) {
    return 0;
  }

  const map = new Map();
  for (let i = 0; i < size; ++i) {
    const value = array[i];
    if (!map.has(value)) {
      map.set(value, 0);
    }

    map.set(value, map.get(value) + 1);
  }


  let nb = 0;

  for (const entries of map.entries()) {
    const value = entries[0];
    const occ = entries[1];
    const lookingFor = diff + value;
    if (map.has(lookingFor)) {
      nb += occ * map.get(lookingFor);
    }
  }

  return nb;
}