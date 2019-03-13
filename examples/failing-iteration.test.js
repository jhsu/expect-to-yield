import { iteratorWithHistory as i } from '../index';
import '../extend-expect';

test('failing with suggestion', () => {
  function* count() {
    let i = 0;
    while (true) {
      yield i;
      i++;
    }
  }

  const gen = i(count());
  gen.next();
  gen.next();
  expect(gen).toYieldValue(1);
});


/*

● failing with suggestion

  expected: 1
  received: 2
  history:
    1: 0
  > 2: 1
    3: 2

  suggestion:
    itr.next();
    expect(itr).toYieldValue(1);

    14 |   gen.next();
    15 |   gen.next();
  > 16 |   expect(gen).toYieldValue(1);
        |               ^
    17 | });
    18 |

    at Object.toYieldValue (examples/failing-iteration.test.js:16:15)

*/
