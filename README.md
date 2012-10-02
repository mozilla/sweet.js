sweet.js
========

Hygienic Macros for JavaScript!

Documentation at [sweetjs.org](http://sweetjs.org).

Overview and motivation in this [talk](https://air.mozilla.org/sweetjs/).

Early stage at the moment. Lots of bugs so be warned!

## Use

Clone sweet.js and then install its dependencies:

    $ npm install underscore optimist escodegen

To try it out make a file `test_macros.js`:

```js
// functions can now be spelled def!
macro def {
  case $name:ident $params $body => {
    function $name $params $body
  }
}
def add (a, b) {
  return a + b;
}

console.log( add(3, 7) );
```

And compile it with `sjs`:

    $ bin/sjs -o output.js test_macros.js
    $ node output.js
    10

### Ruby gem

To compile sweet.js source files from within Ruby, use the [SweetJS gem](https://github.com/magnetised/sweetjs):

    gem install sweetjs

or in your Gemfile:

    gem "sweetjs"

then call the `SweetJS.compile` (or `SweetJS#compile`) method to compile a sweet.js source file to
plain JavaScript:

    require "sweetjs"

    SweetJS.compile(File.read("macros.js.sjs"))
    # => Resulting JS source

    # Alternatively:
    sweet  = SweetJS.new
    source = File.open("macros.js", "r:UTF-8").read
    js     = sweet.compile(source)

## Hacking

Install the dev dependencies:

    $ npm install --dev

And run the tests

    $ npm test
