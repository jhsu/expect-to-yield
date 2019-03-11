import { iteratorWithHistory as i } from "../index";

test(".toYieldValue", () => {
  function* gen() {
    yield 1;
  }
  const itr = i(gen());
  expect(itr).toYieldValue(1);
});

test(".toYieldValue errors with expected value", () => {
  function* gen() {
    yield 2;
  }
  const itr = i(gen());
  expect(() => {
    expect(itr).toYieldValue(1);
  }).toThrowError("expected: 1");
});

test(".toYieldValue errors with received", () => {
  function* gen() {
    yield 2;
  }
  const itr = i(gen());
  expect(() => {
    expect(itr).toYieldValue(1);
  }).toThrowError("received: 2");
});

test(".toYieldValue errors with history", () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  const itr = i(gen());
  itr.next();
  itr.next();
  expect(() => {
    expect(itr).toYieldValue(4);
  }).toThrowError(`history:
  1: 1
  2: 2
  3: 3
`);
});

test(".toYieldValue errors with history and indicator of the seen value", () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  const itr = i(gen());
  itr.next();
  itr.next();
  expect(() => {
    expect(itr).toYieldValue(2);
  }).toThrowError(`history:
  1: 1
> 2: 2
  3: 3
`);
});

test('should output a suggestion on failure', () => {
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  const itr = i(gen());
  itr.next();
  itr.next();
  expect(() => {
    expect(itr).toYieldValue(2);
  }).toThrowError(`
suggestion:
  itr.next();
  expect(itr).toYieldValue(2);
`);
});

test('should output a suggestion with next arguments', () => {
  function* gen() {
    const a = yield 1;
    yield 2;
    yield a + 1;
    yield 4;
  }
  const itr = i(gen());
  itr.next();
  itr.next(2);
  itr.next();
  expect(() => expect(itr).toYieldValue(3) ).toThrowError(`suggestion:
  itr.next();
  itr.next(2);
  expect(itr).toYieldValue(3);
`);
});
