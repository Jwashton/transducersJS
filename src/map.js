/*
 * reduce: reducing function, initial value, collection
 *
 * The reducing function is passed acc, n
 */
export const reduce = (f, i, c) => {
  let acc = i;

  c.forEach(n => {
    acc = f(acc, n);
  });

  return acc;
};

/*
 * Transducing map function. Takes the function to apply to the collection and
 * returns a transducer.
 */
export const map = function map(f) {
  return step =>
    (r, x) => step(r, f(x));
};

/*
 * Transducing filter function. Takes the predicate to apply to the collection
 * and returns a transducer.
 */
export const filter = function filter(pred) {
  return step =>
    (r, x) => pred(x) ? step(r, x) : r;
};

/*
 * Compose, takes a variable number of functions and returns a function that
 * takes a variable number of arguments and passes them to the composition of
 * the original functions.
 */
export const comp = function comp(...funcs) {
  const first = funcs.pop();

  return (...args) => {
    return reduce((stack, f) => f(stack), first(...args), funcs);
  };
};

export default map;
