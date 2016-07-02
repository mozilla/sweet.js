"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceTemplate = exports.processTemplate = undefined;

var _immutable = require("immutable");

var _ramdaFantasy = require("ramda-fantasy");

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _syntax = require("./syntax");

var _syntax2 = _interopRequireDefault(_syntax);

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDolar_912 = s_923 => s_923 && s_923 instanceof _syntax2.default && s_923.match("identifier") && s_923.val() === "$";
const isDelimiter_913 = s_924 => s_924 && typeof s_924.match === "function" && s_924.match("delimiter");
const isBraces_914 = s_925 => s_925 && typeof s_925.match === "function" && s_925.match("braces");
const isParens_915 = s_926 => s_926 && typeof s_926.match === "function" && s_926.match("parens");
const isBrackets_916 = s_927 => s_927 && typeof s_927.match === "function" && s_927.match("brackets");
const insertIntoDelimiter_917 = _ramda2.default.cond([[isBraces_914, (s_928, r_929) => _syntax2.default.from("braces", r_929, s_928)], [isParens_915, (s_930, r_931) => _syntax2.default.from("parens", r_931, s_930)], [isBrackets_916, (s_932, r_933) => _syntax2.default.from("brackets", r_933, s_932)]]);
const process_918 = (acc_934, s_935) => {
  if (isBraces_914(s_935) && isDolar_912(acc_934.template.last())) {
    return { template: acc_934.template.push(_syntax2.default.from("braces", _immutable.List.of(_syntax2.default.from("number", acc_934.interp.size)), s_935)), interp: acc_934.interp.push(s_935.inner()) };
  } else if (isDelimiter_913(s_935)) {
    let innerResult = processTemplate_921(s_935.inner(), acc_934.interp);
    return { template: acc_934.template.push(insertIntoDelimiter_917(s_935, innerResult.template)), interp: innerResult.interp };
  } else {
    return { template: acc_934.template.push(s_935), interp: acc_934.interp };
  }
};
function cloneLineNumber_919(to_936, from_937) {
  if (from_937 && to_936 && typeof to_936.setLineNumber === "function") {
    return to_936.setLineNumber(from_937.lineNumber());
  }
  return to_936;
}
const replace_920 = (acc_938, s_939) => {
  let last_940 = acc_938.template.get(-1);
  let beforeLast_941 = acc_938.template.get(-2);
  if (isBraces_914(s_939) && isDolar_912(last_940)) {
    let index = s_939.inner().first().val();
    (0, _errors.assert)(acc_938.rep.size > index, "unknown replacement value");
    let replacement = cloneLineNumber_919(acc_938.rep.get(index), beforeLast_941);
    return { template: acc_938.template.pop().concat(replacement), rep: acc_938.rep };
  } else if (isDelimiter_913(s_939)) {
    let innerResult = replaceTemplate_922(s_939.inner(), acc_938.rep);
    return { template: acc_938.template.push(insertIntoDelimiter_917(s_939, innerResult)), rep: acc_938.rep };
  } else {
    return { template: acc_938.template.push(s_939), rep: acc_938.rep };
  }
};
function processTemplate_921(temp_942) {
  let interp_943 = arguments.length <= 1 || arguments[1] === undefined ? (0, _immutable.List)() : arguments[1];

  return temp_942.reduce(process_918, { template: (0, _immutable.List)(), interp: interp_943 });
}
function replaceTemplate_922(temp_944, rep_945) {
  return temp_944.reduce(replace_920, { template: (0, _immutable.List)(), rep: rep_945 }).template;
}
exports.processTemplate = processTemplate_921;
exports.replaceTemplate = replaceTemplate_922;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N3ZWV0L3RlbXBsYXRlLXByb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0EsTUFBTSxjQUFjLFNBQVMsU0FBUyxpQ0FBVCxJQUFvQyxNQUFNLEtBQU4sQ0FBWSxZQUFaLENBQXBDLElBQWlFLE1BQU0sR0FBTixPQUFnQixHQUE5RztBQUNBLE1BQU0sa0JBQWtCLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxXQUFaLENBQS9FO0FBQ0EsTUFBTSxlQUFlLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxRQUFaLENBQTVFO0FBQ0EsTUFBTSxlQUFlLFNBQVMsU0FBUyxPQUFPLE1BQU0sS0FBYixLQUF1QixVQUFoQyxJQUE4QyxNQUFNLEtBQU4sQ0FBWSxRQUFaLENBQTVFO0FBQ0EsTUFBTSxpQkFBaUIsU0FBUyxTQUFTLE9BQU8sTUFBTSxLQUFiLEtBQXVCLFVBQWhDLElBQThDLE1BQU0sS0FBTixDQUFZLFVBQVosQ0FBOUU7QUFDQSxNQUFNLDBCQUEwQixnQkFBRSxJQUFGLENBQU8sQ0FBQyxDQUFDLFlBQUQsRUFBZSxDQUFDLEtBQUQsRUFBUSxLQUFSLEtBQWtCLGlCQUFPLElBQVAsQ0FBWSxRQUFaLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLENBQWpDLENBQUQsRUFBd0UsQ0FBQyxZQUFELEVBQWUsQ0FBQyxLQUFELEVBQVEsS0FBUixLQUFrQixpQkFBTyxJQUFQLENBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixLQUE3QixDQUFqQyxDQUF4RSxFQUErSSxDQUFDLGNBQUQsRUFBaUIsQ0FBQyxLQUFELEVBQVEsS0FBUixLQUFrQixpQkFBTyxJQUFQLENBQVksVUFBWixFQUF3QixLQUF4QixFQUErQixLQUEvQixDQUFuQyxDQUEvSSxD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aEIsRUFBNkIsRUFBQyxVQUFVLHNCQUFYLEVBQW1CLFFBQVEsVUFBM0IsRUFBN0IsQ0FBUDtBQUNEO0FBQ0QsU0FBUyxtQkFBVCxDQUE2QixRQUE3QixFQUF1QyxPQUF2QyxFQUFnRDtBQUM5QyxTQUFPLFNBQVMsTUFBVCxDQUFnQixXQUFoQixFQUE2QixFQUFDLFVBQVUsc0JBQVgsRUFBbUIsS0FBSyxPQUF4QixFQUE3QixFQUErRCxRQUF0RTtBQUNEO1FBQzhCLGUsR0FBdkIsbUI7UUFDdUIsZSxHQUF2QixtQiIsImZpbGUiOiJ0ZW1wbGF0ZS1wcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gXCJpbW11dGFibGVcIjtcbmltcG9ydCB7TWF5YmV9IGZyb20gXCJyYW1kYS1mYW50YXN5XCI7XG5pbXBvcnQgXyBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBTeW50YXggZnJvbSBcIi4vc3ludGF4XCI7XG5pbXBvcnQge2Fzc2VydH0gZnJvbSBcIi4vZXJyb3JzXCI7XG5jb25zdCBpc0RvbGFyXzkxMiA9IHNfOTIzID0+IHNfOTIzICYmIHNfOTIzIGluc3RhbmNlb2YgU3ludGF4ICYmIHNfOTIzLm1hdGNoKFwiaWRlbnRpZmllclwiKSAmJiBzXzkyMy52YWwoKSA9PT0gXCIkXCI7XG5jb25zdCBpc0RlbGltaXRlcl85MTMgPSBzXzkyNCA9PiBzXzkyNCAmJiB0eXBlb2Ygc185MjQubWF0Y2ggPT09IFwiZnVuY3Rpb25cIiAmJiBzXzkyNC5tYXRjaChcImRlbGltaXRlclwiKTtcbmNvbnN0IGlzQnJhY2VzXzkxNCA9IHNfOTI1ID0+IHNfOTI1ICYmIHR5cGVvZiBzXzkyNS5tYXRjaCA9PT0gXCJmdW5jdGlvblwiICYmIHNfOTI1Lm1hdGNoKFwiYnJhY2VzXCIpO1xuY29uc3QgaXNQYXJlbnNfOTE1ID0gc185MjYgPT4gc185MjYgJiYgdHlwZW9mIHNfOTI2Lm1hdGNoID09PSBcImZ1bmN0aW9uXCIgJiYgc185MjYubWF0Y2goXCJwYXJlbnNcIik7XG5jb25zdCBpc0JyYWNrZXRzXzkxNiA9IHNfOTI3ID0+IHNfOTI3ICYmIHR5cGVvZiBzXzkyNy5tYXRjaCA9PT0gXCJmdW5jdGlvblwiICYmIHNfOTI3Lm1hdGNoKFwiYnJhY2tldHNcIik7XG5jb25zdCBpbnNlcnRJbnRvRGVsaW1pdGVyXzkxNyA9IF8uY29uZChbW2lzQnJhY2VzXzkxNCwgKHNfOTI4LCByXzkyOSkgPT4gU3ludGF4LmZyb20oXCJicmFjZXNcIiwgcl85MjksIHNfOTI4KV0sIFtpc1BhcmVuc185MTUsIChzXzkzMCwgcl85MzEpID0+IFN5bnRheC5mcm9tKFwicGFyZW5zXCIsIHJfOTMxLCBzXzkzMCldLCBbaXNCcmFja2V0c185MTYsIChzXzkzMiwgcl85MzMpID0+IFN5bnRheC5mcm9tKFwiYnJhY2tldHNcIiwgcl85MzMsIHNfOTMyKV1dKTtcbmNvbnN0IHByb2Nlc3NfOTE4ID0gKGFjY185MzQsIHNfOTM1KSA9PiB7XG4gIGlmIChpc0JyYWNlc185MTQoc185MzUpICYmIGlzRG9sYXJfOTEyKGFjY185MzQudGVtcGxhdGUubGFzdCgpKSkge1xuICAgIHJldHVybiB7dGVtcGxhdGU6IGFjY185MzQudGVtcGxhdGUucHVzaChTeW50YXguZnJvbShcImJyYWNlc1wiLCBMaXN0Lm9mKFN5bnRheC5mcm9tKFwibnVtYmVyXCIsIGFjY185MzQuaW50ZXJwLnNpemUpKSwgc185MzUpKSwgaW50ZXJwOiBhY2NfOTM0LmludGVycC5wdXNoKHNfOTM1LmlubmVyKCkpfTtcbiAgfSBlbHNlIGlmIChpc0RlbGltaXRlcl85MTMoc185MzUpKSB7XG4gICAgbGV0IGlubmVyUmVzdWx0ID0gcHJvY2Vzc1RlbXBsYXRlXzkyMShzXzkzNS5pbm5lcigpLCBhY2NfOTM0LmludGVycCk7XG4gICAgcmV0dXJuIHt0ZW1wbGF0ZTogYWNjXzkzNC50ZW1wbGF0ZS5wdXNoKGluc2VydEludG9EZWxpbWl0ZXJfOTE3KHNfOTM1LCBpbm5lclJlc3VsdC50ZW1wbGF0ZSkpLCBpbnRlcnA6IGlubmVyUmVzdWx0LmludGVycH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt0ZW1wbGF0ZTogYWNjXzkzNC50ZW1wbGF0ZS5wdXNoKHNfOTM1KSwgaW50ZXJwOiBhY2NfOTM0LmludGVycH07XG4gIH1cbn07XG5mdW5jdGlvbiBjbG9uZUxpbmVOdW1iZXJfOTE5KHRvXzkzNiwgZnJvbV85MzcpIHtcbiAgaWYgKGZyb21fOTM3ICYmIHRvXzkzNiAmJiB0eXBlb2YgdG9fOTM2LnNldExpbmVOdW1iZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB0b185MzYuc2V0TGluZU51bWJlcihmcm9tXzkzNy5saW5lTnVtYmVyKCkpO1xuICB9XG4gIHJldHVybiB0b185MzY7XG59XG5jb25zdCByZXBsYWNlXzkyMCA9IChhY2NfOTM4LCBzXzkzOSkgPT4ge1xuICBsZXQgbGFzdF85NDAgPSBhY2NfOTM4LnRlbXBsYXRlLmdldCgtMSk7XG4gIGxldCBiZWZvcmVMYXN0Xzk0MSA9IGFjY185MzgudGVtcGxhdGUuZ2V0KC0yKTtcbiAgaWYgKGlzQnJhY2VzXzkxNChzXzkzOSkgJiYgaXNEb2xhcl85MTIobGFzdF85NDApKSB7XG4gICAgbGV0IGluZGV4ID0gc185MzkuaW5uZXIoKS5maXJzdCgpLnZhbCgpO1xuICAgIGFzc2VydChhY2NfOTM4LnJlcC5zaXplID4gaW5kZXgsIFwidW5rbm93biByZXBsYWNlbWVudCB2YWx1ZVwiKTtcbiAgICBsZXQgcmVwbGFjZW1lbnQgPSBjbG9uZUxpbmVOdW1iZXJfOTE5KGFjY185MzgucmVwLmdldChpbmRleCksIGJlZm9yZUxhc3RfOTQxKTtcbiAgICByZXR1cm4ge3RlbXBsYXRlOiBhY2NfOTM4LnRlbXBsYXRlLnBvcCgpLmNvbmNhdChyZXBsYWNlbWVudCksIHJlcDogYWNjXzkzOC5yZXB9O1xuICB9IGVsc2UgaWYgKGlzRGVsaW1pdGVyXzkxMyhzXzkzOSkpIHtcbiAgICBsZXQgaW5uZXJSZXN1bHQgPSByZXBsYWNlVGVtcGxhdGVfOTIyKHNfOTM5LmlubmVyKCksIGFjY185MzgucmVwKTtcbiAgICByZXR1cm4ge3RlbXBsYXRlOiBhY2NfOTM4LnRlbXBsYXRlLnB1c2goaW5zZXJ0SW50b0RlbGltaXRlcl85MTcoc185MzksIGlubmVyUmVzdWx0KSksIHJlcDogYWNjXzkzOC5yZXB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7dGVtcGxhdGU6IGFjY185MzgudGVtcGxhdGUucHVzaChzXzkzOSksIHJlcDogYWNjXzkzOC5yZXB9O1xuICB9XG59O1xuZnVuY3Rpb24gcHJvY2Vzc1RlbXBsYXRlXzkyMSh0ZW1wXzk0MiwgaW50ZXJwXzk0MyA9IExpc3QoKSkge1xuICByZXR1cm4gdGVtcF85NDIucmVkdWNlKHByb2Nlc3NfOTE4LCB7dGVtcGxhdGU6IExpc3QoKSwgaW50ZXJwOiBpbnRlcnBfOTQzfSk7XG59XG5mdW5jdGlvbiByZXBsYWNlVGVtcGxhdGVfOTIyKHRlbXBfOTQ0LCByZXBfOTQ1KSB7XG4gIHJldHVybiB0ZW1wXzk0NC5yZWR1Y2UocmVwbGFjZV85MjAsIHt0ZW1wbGF0ZTogTGlzdCgpLCByZXA6IHJlcF85NDV9KS50ZW1wbGF0ZTtcbn1cbmV4cG9ydCB7cHJvY2Vzc1RlbXBsYXRlXzkyMSBhcyBwcm9jZXNzVGVtcGxhdGV9O1xuZXhwb3J0IHtyZXBsYWNlVGVtcGxhdGVfOTIyIGFzIHJlcGxhY2VUZW1wbGF0ZX0iXX0=