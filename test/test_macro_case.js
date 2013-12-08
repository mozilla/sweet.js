var expect = require("expect.js");

let describe = macro {
    case {_ $description:lit { $body ... } } => {
        return syntax {
            describe($description, function() {
                $body ...
            });
        }
    }
}

let it = macro {
    case {_ $description:lit { $body ... }} => {
        return syntax {
            it($description, function() {
                $body ...
            });
        }
    }
}

describe "procedural (syntax-case) macros" {
	it "should make a literal syntax object" {
		macro m {
			case { _ () } => {
                return [makeValue (42, #{here})];
			}
		}
		expect(m()).to.be(42);
	}

    it "should work with syntax" {
        macro m {
            case { _ () } => {
                return syntax { 42 }
            }
        }
        expect(m()).to.be(42);
    }

    it "should work with #" {
        macro m {
            case { _ () } => {
                return #{ 42 }
            }
        }
        expect(m()).to.be(42);
    }


    it "should handle returning a single pattern variable" {
        macro m {
            case { _ ($x:expr) } => {
                return #{ $x }
            }
        }
        expect(m(42)).to.be(42);
        expect(m(42 + 24)).to.be(42 + 24);
    }

    it "should handle a repeated pattern in the template" {
        macro m {
            case { _ ($x ...) } => {
                return #{ [$x (,) ...] }
            }
        }
        expect(m(1 2 3)).to.eql([1,2,3]);
    }

    it "should support withSyntax" {
        macro m {
            case {_ $x } => {
                return withSyntax($y = [makeValue(42, #{here})]) {
                    return #{
                        $x + $y
                    }
                }
            }
        }
        expect(m 100).to.be(142);
    }
    
    it "should support withSyntax with multiple patterns" {
        macro m {
            case {_ $x } => {
                return withSyntax($y = [makeValue(10, #{here})], 
                                  $z = [makeValue(20, #{here})]) {
                    return #{$x + $y + $z}
                }
            }
        }
        expect(m 5).to.be(35);
    }

    it "should support withSyntax with repeaters" {
        macro m {
            case {_ $x } => {
                return withSyntax($y ... = [makeValue(10, #{here}),
                                            makePunc('+', #{here}),
                                            makeValue(20, #{here})],
                                  $z = [makeValue(30, #{here})]) {
                    return #{$x + $y ... + $z}
                }
            }
        }
        expect(m 5).to.be(65);
    }
    
    it "should support let bound macros" {
        let m = macro {
            case {_ $x} => { 
                return #{$x} 
            }
        }

        expect(m 42).to.be(42);
    }

    it "should support let bound macros" {
        let function = macro {
            case {_ $x} => { 
                return #{function foo() { return $x; } } 
            }
        }

        expect((function 42)()).to.be(42);
    }

    it "should unwrap the context syntax array for makeDelim" {
        macro $delim {
            case { $$mac $val } => {
                var d = makeDelim('[]', #{$val}, #{$$mac});
                return [d];
            }
        }

        expect($delim 42).to.eql([42]);
    }

    it "should unwrap single element arrays in unwrapSyntax" {
        macro m {
            case {_ () } => {
                var num = unwrapSyntax(#{42})
                return [makeValue(num, #{here})];
            }
        }
        expect(m()).to.be(42);
    }

    it "should handle negative numbers in makeValue" {
        macro m {
            case {_ () } => {
                return [makeValue(-42, #{here})];
            }
        }
        expect(m()).to.be(-42);
    }

    it "should handle NaN in makeValue" {
        macro m {
            case {_ () } => {
                return [makeValue(0/0, #{here})];
            }
        }
        var n = m();
        expect(n).to.be.a('number');
        expect(n).not.to.equal(n);
    }
}
