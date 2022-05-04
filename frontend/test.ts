/*export function map<I, O>(mapper: (input: I) => O, input: I[]): O[] {
  return input.map(mapper)
}*/

function toFunctional<T extends Function>(func: T): Function {
  const fullArgCount = func.length
  function createSubFunction(curriedArgs: unknown[]) {
    return function (this: unknown) {
      const newCurriedArguments = curriedArgs.concat(Array.from(arguments))
      if (newCurriedArguments.length > fullArgCount) {
        throw new Error("Too many arguments")
      }
      if (newCurriedArguments.length === fullArgCount) {
        return func.apply(this, newCurriedArguments)
      }
      return createSubFunction(newCurriedArguments)
    }
  }
  return createSubFunction([])
}

interface MapperFunc<I, O> {
  (): MapperFunc<I, O>
  (input: I[]): O[]
}

interface MapFunc {
  (): MapFunc
  <I, O>(mapper: (item: I) => O): MapperFunc<I, O>
  <I, O>(mapper: (item: I) => O, input: I[]): O[]
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
export function typeAssert<T extends true>() {}

export type IsNotAny<T> = 0 extends 1 & T ? false : true

export type IsTypeEqual<T1, T2> = IsNotAny<T1> extends false
  ? false
  : IsNotAny<T2> extends false
  ? false
  : [T1] extends [T2]
  ? [T2] extends [T1]
    ? true
    : false
  : false

export const map = toFunctional(<I, O>(fn: (arg: I) => O, input: I[]) => input.map(fn)) as MapFunc
const mapResult1 = map<number, string>(String, [1, 2, 3])
console.log(typeof mapResult1)
console.log(mapResult1)
console.log("damn")
const S: string[] = ["1"]
console.log(typeof S)
