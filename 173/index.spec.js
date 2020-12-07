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

const stringMultiply = require('./index');

describe('stringMultiply', () => {
  it('should compute 123 * 0', () => {
    expect(stringMultiply('123', '0')).toBe('0');
  });

  it('should compute 0 * 456', () => {
    expect(stringMultiply('0', '456')).toBe('0');
  });

  it('should compute 1 * 45', () => {
    expect(stringMultiply('1', '45')).toBe('45');
  });

  it('should compute 123 * 1', () => {
    expect(stringMultiply('123', '1')).toBe('123');
  });

  it('should compute 123 * 45', () => {
    expect(stringMultiply('123', '45')).toBe('5535');
  });

  it('should compute 123 * 456', () => {
    expect(stringMultiply('123', '456')).toBe('56088');
  });

  it('should compute 123456 * 123456', () => {
    expect(stringMultiply('123456', '123456')).toBe('15241383936');
  });

  it('should compute 987654 * 45', () => {
    expect(stringMultiply('987654', '45')).toBe('44444430');
  });

  it('should compute 987654 * 456', () => {
    expect(stringMultiply('987654', '456')).toBe('450370224');
  });
});
