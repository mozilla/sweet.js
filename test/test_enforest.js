var parser = require("../build/lib/parser");
var expander = require("../build/lib/expander");
var expect = require("expect.js");

var enforest = expander.enforest;
var read = parser.read;
var expand = expander.expand;
var flatten = expander.flatten;

var makeExpanderContext = expander.makeExpanderContext;

function mkContext() {
    return makeExpanderContext({phase: 0});
}

describe("enforest", function() {
    it("should enforest a single ident", function() {
        var res = enforest(read("x"), mkContext());
        expect(res.result.id.token.value).to.be("x");
    });

    it("should enforest a macro definition", function() {
        var res = enforest(read("stxrec id { case $x => { $x } } fun"), mkContext());
        expect(res.result.name.token.inner[0].token.value).to.be("id");
        expect(res.result.body.length).to.be(4);
        expect(res.rest[0].token.value).to.be("fun")
    });

    it("should enforest a function declaration", function() {
        var res = enforest(read("function id (x) { return x; }"), mkContext());
        expect(res.result.name.token.value).to.be("id");
        expect(res.result.params.token.inner[0].token.value).to.be("x");
    });

    it("should enforest a VarStatement", function() {
        var res = enforest(read("var x, y"), mkContext());
        expect(res.result.decls.length).to.be(2);
    });

    it("should enforest a VarStatement with only a name and no EOF", function() {
        var toks = read("var x");
        toks.pop();
        var res = enforest(toks, mkContext());
        expect(res.result.decls.length).to.be(1);
    })

    it("should enforest AssignmentExpressions", function() {
        var res = enforest(read("x = 5"), mkContext());
        expect(res.result.op.token.value).to.be('=');
        expect(res.result.left.id.token.value).to.be('x');
        expect(res.result.right.lit.token.value).to.be(5);

        res = enforest(read("x += 5"), mkContext());
        expect(res.result.op.token.value).to.be('+=');

        // Should just enforest the function call `foo(x)`
        res = enforest(read("foo(x) = 5"), mkContext());
        expect(res.result.fun.id.token.value).to.be('foo');
    });

    it("should enforest ParenExpressions with multiple expressions", function() {
      var res = enforest(read("(1, 2, 3)"), mkContext());
      expect(res.result.isParenExpressionTerm).to.be(true);
      expect(res.result.args.length).to.be(3);
    });

    // Currently disabled because it requires --harmony mode
    // it("should maintain let hygiene when enforesting an expression with ASI", function() {
    //     'use strict';
    //     let a = 1 // No semicolons
    //     let b = 2 
    //     function test() {
    //         // If the bug is present, this is a ReferenceError
    //         return b;
    //     }
    //     expect(test()).to.be(2);
    // });
});

