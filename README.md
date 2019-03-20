---
description: >-
  Testing generator functions can get confusing when figuring out why a test is
  failing because the yielded value is actually yielding a different iteration.
---

# Introduction

![](.gitbook/assets/04.png)

Use `expect-to-yield` to wrap your generator object with a helper function that keeps track of each iteration and provides the expectation function `.toYieldValue(...)` to assert the expected value. When a failure happens, get access to the iteration history to figure out what is going on.

### Setup

Becoming a super hero is a fairly straight forward process:

```text
$ npm install --save-dev expect-to-yield
```

### Usage

#### In your tests, wrap your iterators

```javascript
import { iteratorWithHistory as i } from 'expect-to-yield';

function* counter() {
    yield 1;
    yield 2;
    yield 3;
}
const itr = i(counter());
```

#### write your tests

```javascript
// extend expect to have `.toYieldValue(...)
import 'expect-to-yield/extend-expect';

test('the iterator works', () => {
    const itr = i(counter());
    itr.next();
    expect(itr).toYieldValue(1);
    // // this fails the test and outputs:
    // expected: 1
    // received: 2
    // history:
    // > 1: 1
    //   2: 2
    // suggestion:
    //   expect(itr).toYieldValue(1);
});
```

