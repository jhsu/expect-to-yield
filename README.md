---
description: >-
  Redux-saga's uses generators to yield effects. It can get confusing figuring
  out why a test is failing because the effect is yielding at a different
  iteration.
---

# Introduction

![](.gitbook/assets/04.png)

The iterator that is created from the generator gets wrapped in a helper function that keeps track of each iteration and a provided expectation function gives insight into previous iterations and possible matches.

