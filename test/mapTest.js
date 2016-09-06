import test from 'ava';
import { reduce, map, filter, comp } from '../src/map';

const equal = (lhs, rhs) => {
  const [li, ri] = [lhs[Symbol.iterator](), rhs[Symbol.iterator]()];

  let [lval, rval] = [li.next(), ri.next()];

  while (!lval.done) {
    if (lval.value !== rval.value) {
      return false;
    }

    lval = li.next();
    rval = ri.next();
  }

  return true;
};

const source = [1, 2, 3, 4];
const step = (r, x) => [...r, x];

const even = n => n % 2 === 0;
const double = n => n * 2;
const mapping = (f, col) => reduce(map(f)(step), [], col);
const filtering = (f, col) => reduce(filter(f)(step), [], col);

test('custom map passed one function returns a function', t => {
  t.is(typeof map(() => undefined), 'function');
});

test('mapping can be applied to an array', t => {
  t.true(equal(mapping(double, source), [2, 4, 6, 8]));
});

test('can filter an array', t => {
  t.true(equal(filtering(even, source), [2, 4]));
});

test('can compose transducers', t => {
  const process = comp(filter(even), map(double));

  const processing = col => reduce(process(step), [], col);

  t.true(equal(processing(source), [4, 8]));
});

test('can work on sets', t => {
  const set = new Set([1, 2, 3, 4]);

  const next = (r, x) => new Set([...r.values(), x]);

  const processing = col => reduce(map(double)(next), new Set(), col);

  t.true(equal(processing(set), [2, 4, 6, 8]));
});

test('comp will compose two functions', t => {
  const neg = n => -n;

  t.is(comp(double, neg)(12), -24);
});

test('comp can handle multiple args', t => {
  const add = (...n) => n.reduce((acc, x) => acc + x, 0);

  t.is(comp(String, add)(12, 5), '17');
  t.is(typeof comp(String, add)(12, 5), 'string');
});

test('can process a custom iterator', t => {
  const process = comp(filter(even), map(double));

  const generator = (function *generator() {
    yield* [1, 2, 3, 4];
  })();

  const processing = col => reduce(process(step), [], col);

  t.true(equal(processing(generator), [4, 8]));
});
