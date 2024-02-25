function checkValidInput(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

export default checkValidInput;
