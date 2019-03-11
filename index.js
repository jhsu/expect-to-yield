function generateSuggestion(idx, expected, history) {
  let output = '';
  if (idx >= 0) {
    let n = 0;
    while (n <= idx) {
      const [_, arg] = history[n];
      const nextSugg =  (n === idx ? `  expect(itr).toYieldValue(${JSON.stringify(expected)});\n` : `  itr.next(${arg === undefined ? '' : arg});\n`);
      output += nextSugg;
      n++;
    }

    return output;
  }
}

function toYieldValue(iter, expected) {
  const nextStep = iter.next();
  let foundIdx;
  const history = iter.history.map(
    ([val, arg], idx) => {
      const equalsExpected = this.equals(expected, val);
      if (equalsExpected && !foundIdx) {
        foundIdx = idx;
      }
      return `${equalsExpected ? ">" : " "} ${idx + 1}: ${val}`
    }
  );
  const suggestion = foundIdx >= 0 ? `\nsuggestion:\n${generateSuggestion(foundIdx, expected, iter.history)}` : null;
  const pass = this.equals(nextStep.value, expected);
  return {
    pass,
    message: () => `expected: ${expected}
received: ${nextStep.value}
history:
${history.join("\n")}
${suggestion}`
  };
}

function iteratorWithHistory(itr) {
  const history = [];
  return {
    history,
    next: value => {
      const output = itr.next(value);
      history.push([output.value, value]);
      return output;
    }
  };
}

export { toYieldValue, iteratorWithHistory };
