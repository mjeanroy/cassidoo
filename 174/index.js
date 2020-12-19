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

//
// Given a list of folders in a filesystem and the name of a folder to remove, return the new list of folders after removal.
//
//
// Examples:
// $ removeFolder([“/a”,”/a/b”,”/c/d”,”/c/d/e”,”/c/f”, “/c/f/g”], ‘c’)
// $ [“/a”,”/a/b”]
// $ removeFolder([“/a”,”/a/b”,”/c/d”,”/c/d/e”,”/c/f”, “/c/f/g”], ‘d’) $ [“/a”,”/a/b”,”/c”,”/c/f”, “/c/f/g”]
//

module.exports = function removeFolder(folders, toRemove) {
  const results = new Set();

  for (let i = 0; i < folders.length; ++i) {
    const truncatedFolder = truncate(folders[i], toRemove);
    if (truncatedFolder) {
      results.add(truncatedFolder);
    }
  }

  return Array.from(results);
}

function truncate(folder, toRemove) {
  const parts = folder.split('/');
  const results = [];
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (part === toRemove) {
      break;
    }

    results.push(part);
  }

  return results.join('/');
}
