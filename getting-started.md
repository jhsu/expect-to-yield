# Getting Started

## Setup

Becoming a super hero is a fairly straight forward process:

```
$ npm install --save-dev expect-to-yield
```

### In your tests, wrap your iterators

```javascript
import { iteratorWithHistory as i } from 'expect-to-yield';

function* counter() {
    yield 1;
    yield 2;
    yield 3;
}
const itr = i(counter());
```

### write your tests

```javascript
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
});


```



