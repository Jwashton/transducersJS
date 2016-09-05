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

export const map = function map(f, c) {
  if (c) {
    return c.map(f);
  }

  return step =>
    (r, x) => step(r, f(x));
};

export const filter = function filter(pred, c) {
  if (c) {
    return c.filter(pred);
  }

  return step =>
    (r, x) => pred(x) ? step(r, x) : r;
};

export const comp = function comp(...funcs) {
  return arg => {
    return reduce((stack, f) => f(stack), arg, funcs);
  };
};

export default map;
