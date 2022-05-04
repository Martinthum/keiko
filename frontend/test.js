"use strict";
/*export function map<I, O>(mapper: (input: I) => O, input: I[]): O[] {
  return input.map(mapper)
}*/
exports.__esModule = true;
exports.map = exports.typeAssert = void 0;
function toFunctional(func) {
    var fullArgCount = func.length;
    function createSubFunction(curriedArgs) {
        return function () {
            var newCurriedArguments = curriedArgs.concat(Array.from(arguments));
            if (newCurriedArguments.length > fullArgCount) {
                throw new Error("Too many arguments");
            }
            if (newCurriedArguments.length === fullArgCount) {
                return func.apply(this, newCurriedArguments);
            }
            return createSubFunction(newCurriedArguments);
        };
    }
    return createSubFunction([]);
}
/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 */
function typeAssert() { }
exports.typeAssert = typeAssert;
exports.map = toFunctional(function (fn, input) { return input.map(fn); });
var mapResult1 = (0, exports.map)(String, [1, 2, 3]);
console.log(typeof mapResult1);
console.log(mapResult1);
console.log("damn");
var S = ["1"];
console.log(typeof S);
