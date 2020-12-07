module.exports = function stringMultiply(x, y) {
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
    computeProducts(x, y)
  );
}

function computeProducts(x, y) {
  const products = [];

  // For example, suppose x = 123 and y = 45
  //   123
  // x  45
  //
  // We want to evaluate:
  //
  // i == 0
  // 1-1 5 * 3 => 15 => 5, carry = 1
  // 1-2 5 * 2 => 10 + 1 => 11 => 1, carry = 1
  // 1-3 5 * 1 => 5 + 1 => 6
  // 1-4 carry = 0
  // ==> [5, 1, 6]
  //
  // i == 1 => add one zero => 0
  // 2-3 4 * 3 => 12 => 2, carry = 1
  // 2-3 4 * 2 => 8 + 1 => 9
  // 2-3 4 * 1 => 4
  // 2-4 carry = 0
  // ==> [0, 2, 9, 4]

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