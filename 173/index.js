/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Mickael Jeanroy
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
 * Multiply two numbers, represented as strings, without using number casting.
 *
 * @param {string} x First number.
 * @param {string} y Second number.
 * @return {string} The multiplication result.
 */
function stringMultiply(x, y) {
  if (x === '0' || y === '0') {
    return '0';
  }

  if (x === '1') {
    return y;
  }

  if (y === '1') {
    return x;
  }

  return computeSumOfProducts(
      computeProducts(x, y),
  );
}

/**
 * Compute the product of two numbers by returning all intermediate product results.
 *
 * For example, suppose x = 123 and y = 45
 *   123
 * x  45
 *
 * We want to evaluate:
 *
 * i == 0
 * 1-1 5 * 3 => 15 => 5, carry = 1
 * 1-2 5 * 2 => 10 + 1 => 11 => 1, carry = 1
 * 1-3 5 * 1 => 5 + 1 => 6
 * 1-4 carry = 0
 * ==> [5, 1, 6]
 *
 * i == 1 => add one zero => 0
 * 2-3 4 * 3 => 12 => 2, carry = 1
 * 2-3 4 * 2 => 8 + 1 => 9
 * 2-3 4 * 1 => 4
 * 2-4 carry = 0
 * ==> [0, 2, 9, 4]
 *
 * In this case, this function will returns:
 * ```
 * [
 *   [5, 1, 6],
 *   [0, 2, 9, 4],
 * ]
 * ```
 *
 * @param {string} x The first number.
 * @param {string} y The second number.
 * @return {Array<number[]>} The result of the multiplication, each element in the array being an array of digits.
 */
function computeProducts(x, y) {
  const products = [];

  // Start with each digit of `y` in reverse order.
  for (let i = 0; i < y.length; ++i) {
    const nb1 = y[y.length - i - 1] - '0';
    const result = [];

    // Populate with zero until position of `i`.
    for (let k = 0; k < i; ++k) {
      result.push(0);
    }

    // Do the math and do not forget carry at each step.
    let carry = 0;

    for (let j = x.length - 1; j >= 0; --j) {
      const nb2 = x[j] - '0';

      let product = (nb1 * nb2) + carry;

      if (product >= 10) {
        carry = Math.floor(product / 10);
        product = product % 10;
      } else {
        carry = 0;
      }

      result.push(product);
    }

    if (carry) {
      result.push(carry);
    }

    products.push(result);
  }

  return products;
}

/**
 * Compute the sum of the numbers in given array,
 *
 * For example, suppose previous results when x = 123 and y = 45
 * We have two numbers to sum up:
 * - [5, 1, 6]
 * - [0, 2, 9, 4]
 *
 * We start with the array with the bigger size: it is the last one.
 *
 * i == 0
 * 1- 5 + 0 => 5, carry = 0
 * 2- 1 + 2 => 3, carry = 0
 * 3- 6 + 9 => 15 => 5, carry = 1
 * 4- 4 + undefined + carry => 4 + 0 + 1 = 5, carry = 0
 * 5- carry = 0
 *
 * ==> The final result should be: 5535
 *
 * @param {Array<number[]>} products Numbers to add.
 * @return {string} The final result.
 */
function computeSumOfProducts(products) {
  // For example, suppose previous results when x = 123 and y = 45
  // We have two numbers to sum up:
  // - [5, 1, 6]
  // - [0, 2, 9, 4]
  //
  // We start with the array with the bigger size: it is the last one.
  //
  // i == 0
  // 1- 5 + 0 => 5, carry = 0
  // 2- 1 + 2 => 3, carry = 0
  // 3- 6 + 9 => 15 => 5, carry = 1
  // 4- 4 + undefined + carry => 4 + 0 + 1 = 5, carry = 0
  // 5- carry = 0
  //
  // ==> The final result should be: 5535

  const size = products[products.length - 1].length;

  let carry = 0;
  let product = '';

  for (let i = 0; i < size; ++i) {
    let sumOfDigits = 0;
    for (let j = 0; j < products.length; ++j) {
      sumOfDigits += (products[j][i] || 0);
    }

    let sum = sumOfDigits + carry;
    if (sum >= 10) {
      carry = Math.floor(sum / 10);
      sum = sum % 10;
    } else {
      carry = 0;
    }

    product = sum.toString() + product;
  }

  if (carry) {
    product = carry.toString() + product;
  }

  return product;
}

module.exports = {
  stringMultiply,
};
