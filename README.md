async_bench
=======
[![Build
Status](https://travis-ci.org/mcollina/async_bench.png)](https://travis-ci.org/mcollina/async_bench)

The node.js benchmark framework designed around the node callback style.

## Installation

```
npm install async_bench --save
```

## Example

```
var bench = require("async_bench");
var crypto = require("crypto");
var fs = require("fs");

bench({
  runs: 10000,
  preHeat: 10000,
  setup: function(cb) {
    fs.readFile(__filename, cb);
  },
  bench: function(data, cb) { 
    var shasum = crypto.createHash('sha1');
    shasum.update(data);
    var d = shasum.digest('hex');
    cb();
  },
  complete: function(err, results) {
    if (err)
      throw err;

    console.log(results);
  }
});

```

## Motives

In node, the most popular style for passing callback is:
```
myAsyncFunction(function (err, arg1, arg2, ...) {
  // do something
});
```
Where the first argument is the error.
__async_bench__ is the first benchmark
library that adopted this style.

In __async_bench__ all steps are defined using this convention,
and everything is run by the popular
[async](https://github.com/caolan/async) library.

## Contributing to async_bench

* Check out the latest master to make sure the feature hasn't been
  implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't
  requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it
  in a future version unintentionally.
* Please try not to mess with the Makefile and package.json. If you
  want to have your own version, or is otherwise necessary, that is
  fine, but please isolate to its own commit so I can cherry-pick around
  it.

## LICENSE - "MIT License"

Copyright (c) 2012-2013 Matteo Collina, http://matteocollina.com

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
