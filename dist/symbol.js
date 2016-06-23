"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
let internedMap_776 = new Map();
let counter_777 = 0;
function gensym_778(name_781) {
  let prefix_782 = name_781 == null ? "s_" : name_781 + "_";
  let sym_783 = new Symbol_779(prefix_782 + counter_777);
  counter_777++;
  return sym_783;
}
function Symbol_779(name_784) {
  this.name = name_784;
}
Symbol_779.prototype.toString = function () {
  return this.name;
};
function makeSymbol_780(name_785) {
  if (internedMap_776.has(name_785)) {
    return internedMap_776.get(name_785);
  } else {
    let sym = new Symbol_779(name_785);
    internedMap_776.set(name_785, sym);
    return sym;
  }
}
exports.Symbol = makeSymbol_780;
exports.SymbolClass = Symbol_779;
exports.gensym = gensym_778;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N3ZWV0L3N5bWJvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUksa0JBQWtCLElBQUksR0FBSixFQUF0QjtBQUNBLElBQUksY0FBYyxDQUFsQjtBQUNBLFNBQVMsVUFBVCxDQUFvQixRQUFwQixFQUE4QjtBQUM1QixNQUFJLGFBQWEsWUFBWSxJQUFaLEdBQW1CLElBQW5CLEdBQTBCLFdBQVcsR0FBdEQ7QUFDQSxNQUFJLFVBQVUsSUFBSSxVQUFKLENBQWUsYUFBYSxXQUE1QixDQUFkO0FBQ0E7QUFDQSxTQUFPLE9BQVA7QUFDRDtBQUNELFNBQVMsVUFBVCxDQUFvQixRQUFwQixFQUE4QjtBQUM1QixPQUFLLElBQUwsR0FBWSxRQUFaO0FBQ0Q7QUFDRCxXQUFXLFNBQVgsQ0FBcUIsUUFBckIsR0FBZ0MsWUFBWTtBQUMxQyxTQUFPLEtBQUssSUFBWjtBQUNELENBRkQ7QUFHQSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0M7QUFDaEMsTUFBSSxnQkFBZ0IsR0FBaEIsQ0FBb0IsUUFBcEIsQ0FBSixFQUFtQztBQUNqQyxXQUFPLGdCQUFnQixHQUFoQixDQUFvQixRQUFwQixDQUFQO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsUUFBSSxNQUFNLElBQUksVUFBSixDQUFlLFFBQWYsQ0FBVjtBQUNBLG9CQUFnQixHQUFoQixDQUFvQixRQUFwQixFQUE4QixHQUE5QjtBQUNBLFdBQU8sR0FBUDtBQUNEO0FBQ0Y7UUFDeUIsTSxHQUFsQixjO1FBQXdDLFcsR0FBZCxVO1FBQ1osTSxHQUFkLFUiLCJmaWxlIjoic3ltYm9sLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGludGVybmVkTWFwXzc3NiA9IG5ldyBNYXA7XG5sZXQgY291bnRlcl83NzcgPSAwO1xuZnVuY3Rpb24gZ2Vuc3ltXzc3OChuYW1lXzc4MSkge1xuICBsZXQgcHJlZml4Xzc4MiA9IG5hbWVfNzgxID09IG51bGwgPyBcInNfXCIgOiBuYW1lXzc4MSArIFwiX1wiO1xuICBsZXQgc3ltXzc4MyA9IG5ldyBTeW1ib2xfNzc5KHByZWZpeF83ODIgKyBjb3VudGVyXzc3Nyk7XG4gIGNvdW50ZXJfNzc3Kys7XG4gIHJldHVybiBzeW1fNzgzO1xufVxuZnVuY3Rpb24gU3ltYm9sXzc3OShuYW1lXzc4NCkge1xuICB0aGlzLm5hbWUgPSBuYW1lXzc4NDtcbn1cblN5bWJvbF83NzkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5uYW1lO1xufTtcbmZ1bmN0aW9uIG1ha2VTeW1ib2xfNzgwKG5hbWVfNzg1KSB7XG4gIGlmIChpbnRlcm5lZE1hcF83NzYuaGFzKG5hbWVfNzg1KSkge1xuICAgIHJldHVybiBpbnRlcm5lZE1hcF83NzYuZ2V0KG5hbWVfNzg1KTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgc3ltID0gbmV3IFN5bWJvbF83NzkobmFtZV83ODUpO1xuICAgIGludGVybmVkTWFwXzc3Ni5zZXQobmFtZV83ODUsIHN5bSk7XG4gICAgcmV0dXJuIHN5bTtcbiAgfVxufVxuZXhwb3J0IHttYWtlU3ltYm9sXzc4MCBhcyBTeW1ib2wsIFN5bWJvbF83NzkgYXMgU3ltYm9sQ2xhc3N9O1xuZXhwb3J0IHtnZW5zeW1fNzc4IGFzIGdlbnN5bX0iXX0=