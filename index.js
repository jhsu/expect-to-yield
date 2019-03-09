function toYieldValue(iter, expected) {
  const nextStep = iter.next();
  const history = iter.history.map(
    (val, idx) => `${this.equals(expected, val) ? ">" : " "} ${idx + 1}: ${val}`
  );
  const pass = this.equals(nextStep.value, expected);
  return {
    pass,
    message: () => `expected: ${expected}
received: ${nextStep.value}

history:
${history.join("\n")}
`
  };
}

export default function iteratorWithHistory(itr) {
  const history = [];
  return {
    history,
    next: value => {
      const output = itr.next(value);
      history.push(output.value);
      return output;
    }
  };
}

export { toYieldValue };
