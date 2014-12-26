requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(["./sweet", "./syntax"], function(sweet, syn) {
    var storage_code = 'editor_code';
    var storage_mode = 'editor_mode';

    var starting_code = $("#editor").text();
    var compileWithSourcemap = $("body").attr("data-sourcemap") === "true";

    function nextCursorPos(dir, cm) {
        
        // will be 0 if dir == -1, 1 if dir !-1
        var multiplier = Number(Boolean(~dir));
        // will be -1 if dir is -1, else 0 if dir is !1
        var jumper = -1 * Number(Boolean(dir - 1));
        
        var position = cm.getCursor("head");
        var line = position.line;
        var ch   = position.ch;
        var content = cm.getLine(line);
        
        var hBound = ~dir ? content.length - ch : ch;
        var vBound = multiplier * (cm.lineCount() - 1);
        var unit = cm.options.indentUnit;
        var tabSpaces = Array(unit + 1).join(" ");
        var range, left, right;
        
        // Is there enough room to jump over a tab-width of spaces?
        if(hBound < unit) {
            // should we jump lines?
            if(hBound === 0) {
                // Are we on the top or bottom line?
                if(line === vBound) {
                    left = position;
                    right = position;
                } else {
                    // jump to the next/previous line
                    content = cm.getLine(line + dir);
                    left  = {line: line + (multiplier - 1), ch: (content.length * jumper * -1) + (ch * multiplier)};
                    right = {line: line + multiplier, ch: 0};
                }
            } else {
                // jump one space left or right
                left = {line: line, ch: ch + jumper};
                right = {line: line, ch: ch + multiplier};
            }
        } else {
            left  = {line: line, ch: ch + (unit * jumper)};
            right = {line: line, ch: ch + (unit * multiplier)};
            range = cm.getRange(left, right);
            // is the range to the left/right a tab-worth of spaces?
            if(range !== tabSpaces) {
                // no, only jump one space left/right
                left = {line: line, ch: ch + jumper};
                right = {line: line, ch: ch + multiplier};
            }
        }
        return { left: left, right: right };
    }

    var editor = CodeMirror.fromTextArea($('#editor')[0], {
        lineNumbers: true,
        smartIndent: true,
        indentWithTabs: false,
        tabSize: 2,
        indentUnit: 2,
        autofocus: true,
        theme: 'solarized dark',
        extraKeys: {
            Tab: function(cm) {
                if(cm.somethingSelected()) {
                    return cm.indentSelection("add");
                } else if(cm.options.indentWithTabs) {
                    return cm.replaceSelection("\t", "end", "+input");
                } else {
                    return cm.execCommand("insertSoftTab");
                }
            },
            Left: function(cm) {
                return cm.setCursor(nextCursorPos(-1, cm).left);
            },
            Right: function(cm) {
                return cm.setCursor(nextCursorPos(1, cm).right);
            },
            Backspace: function(cm) {
                var coords = nextCursorPos(-1, cm);
                var range = cm.getRange(coords.left, coords.right);
                cm.replaceRange("", coords.left, coords.right, range);
            },
            Delete: function(cm) {
                var coords = nextCursorPos(1, cm);
                var range = cm.getRange(coords.left, coords.right);
                cm.replaceRange("", coords.left, coords.right, range);
            }
        }
    });

    var currentStep = 1;

    if (window.location.hash) {
        editor.setValue(decodeURI(window.location.hash.slice(1)));
    } else {
        editor.setValue(localStorage[storage_code] ? localStorage[storage_code] : starting_code);
    }
    if(localStorage[storage_mode]) {
        editor.setOption("keyMap", localStorage[storage_mode]);
    }

    var output = CodeMirror.fromTextArea($('#output')[0], {
        lineNumbers: true,
        theme: 'solarized dark',
        readOnly: true
    });

    $('#btn-vim').click(function() {
        editor.setOption('keyMap', 'vim');
        editor.focus();
        localStorage[storage_mode] = "vim";
    });
    $('#btn-emacs').click(function() {
        editor.setOption('keyMap', 'emacs');
        editor.focus();
        localStorage[storage_mode] = "emacs";
    });

    $('#btn-step').click(function() {
        var unparsedString = syn.prettyPrint(
            sweet.expand(editor.getValue(), 
                         undefined, 
                         currentStep++),
            $("#ck-hygiene").prop("checked"));
        $("#lab-step").text(currentStep);
        output.setValue(unparsedString); 
    });

    var updateTimeout;
    editor.on("change", function(e) {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updateExpand, 200);
    });

    function updateExpand() {
        var code = editor.getValue();
        var expanded, compiled, res;
        window.location = "editor.html#" + encodeURI(code);
        localStorage[storage_code] = code;
        try {
            if (compileWithSourcemap) {
                res = sweet.compile(code, {
                    sourceMap: true,
                    filename: "test.js",
                    readableNames: true
                });
            } else {
                res = sweet.compile(code, {
                    sourceMap: false,
                    readableNames: true
                });
            }
            compiled = res.code;
            output.setValue(compiled);

            $('#errors').text('');
            $('#errors').hide();
        } catch (e) {
            $('#errors').text(e);
            $('#errors').show();
        }
    }
    updateExpand();
});
