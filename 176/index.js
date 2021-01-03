/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Mickael Jeanroy
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

/* eslint-disable brace-style */

const SUBSTRING = '2020';

/**
 * You’re given a string of characters that are only 2s and 0s.
 * Return the index of the first occurrence of “2020” without using the indexOf (or similar) function,
 * and -1 if it’s not found in the string.
 *
 * @param {string} str The text.
 * @return {number} The first index of `subString` or -1.
 */
function find2020(str) {
  if (!str || str.length < SUBSTRING.length) {
    return -1;
  }

  if (str === SUBSTRING) {
    return 0;
  }

  let i = 0;
  let j = 0;

  for (; i < str.length; ++i) {
    const c = str[i];
    if (c === SUBSTRING[j]) {
      j++;
    } else if (j > 0) {
      i -= j;
      j = 0;
    }

    if (j === SUBSTRING.length) {
      return i - (j - 1);
    }
  }

  return -1;
}

/**
 * Build the `longest proper prefix / suffix` table of the given pattern.
 *
 * This functions will return an array of length `n` where n is length of the pattern.
 *
 * At each index `i`, we will have the length of the proper prefix which is also a suffix
 * of the given pattern (a proper prefix being a prefix of a string which is not the string itself).
 *
 * For example:
 *
 * ```
 * lps('AAAA') => [0, 1, 2, 3]
 * lps('ABCDE') => [0, 0, 0, 0]
 * lps('AABAACAABAA') => [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]
 * lps('AAACAAAAAC') => [0, 1, 2, 0, 1, 2, 3, 3, 3, 4]
 * lps('AAABAAA') => [0, 1, 2, 0, 1, 2, 3]
 * ```
 *
 * @param {string} subString The substring we are looking for.
 * @return {Array<number>} The final table.
 */
function lps(subString) {
  const output = [];
  const n = subString.length;

  let i = 0;
  let j = -1;

  while (i !== n) {
    const c1 = subString[i];
    const c2 = j >= 0 ? subString[j] : '';

    if (c1 === c2) {
      output[i] = j + 1;
      j++;
      i++;
    } else if (j > 0) {
      j = output[j - 1];
    } else {
      output[i] = 0;
      i++;
      j = 0;
    }
  }

  return output;
}

/**
 * Implement the KMP search part using the previously
 * computed LPS table.
 *
 * @param {string} input The input.
 * @param {string} subString The substring we are looking for.
 * @param {Array<number>} lpsTable The LPS table.
 * @return {number} The first index of `subString` in `input.
 */
function kmpSearch(input, subString, lpsTable) {
  let i = 0;
  let m = 0;

  const n = subString.length;
  const l = input.length;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if ((m + i) === l) {
      return -1;
    }

    const c1 = subString[i];
    const c2 = input[m + i];
    if (c1 === c2) {
      i = i + 1;
      if (i === n) {
        return m;
      }
    }

    else {
      const e = i === 0 ? -1 : lpsTable[i - 1];
      m = m + i - e;
      if (i > 0) {
        i = e;
      }
    }
  }
}

/**
 * You’re given a string of characters that are only 2s and 0s.
 * Return the index of the first occurrence of “2020” without using the indexOf (or similar) function,
 * and -1 if it’s not found in the string.
 *
 * This function use the KMP algorithm (a.k.a `Knuth-Morris-Pratt algorithm`).
 *
 * @param {string} input The input.
 * @return {number} The first index of '2020' in given input.
 * @see https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
 * @see https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/
 */
function find2020KMP(input) {
  if (!input || input.length < SUBSTRING.length) {
    return -1;
  }

  if (input === SUBSTRING) {
    return 0;
  }

  const lpsTable = lps(SUBSTRING);
  return kmpSearch(input, SUBSTRING, lpsTable);
}

module.exports = {
  find2020,
  find2020KMP,
};
