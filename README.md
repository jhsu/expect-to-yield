---
description: >-
  Testing generator functions can get confusing when figuring out why a test is
  failing because the yielded value is actually yielding a different iteration.
---

# Introduction

![](.gitbook/assets/04.png)

Use `expect-to-yield` to wrap your generator object with a helper function that keeps track of each iteration and provides the expectation function `.toYieldValue(...)` to assert the expected value. When a failure happens, get access to the iteration history to figure out what is going on.

