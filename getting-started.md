# Getting Started

## Setup

Becoming a super hero is a fairly straight forward process:

```
$ npm install --save-dev redux-saga-test-path
```

### In your tests, wrap your iterators

```javascript
import i from 'redux-saga-test-path';

function* counter() {
    yield 1;
    yield 2;
    yield 3;
}
const itr = i(counter());
```

### write your tests

```javascript
import 'redux-saga-test-path/extend-expect';

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



