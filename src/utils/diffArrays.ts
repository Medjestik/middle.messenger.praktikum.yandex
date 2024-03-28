function diffArrays<T>(oldArray: T[], newArray: T[], key: keyof T): { added: T[], removed: T[] } {
  const added: T[] = [];
  const removed: T[] = [];

  newArray.forEach((newItem) => {
    const found = oldArray.find((oldItem) => oldItem[key] === newItem[key]);
    if (!found) {
      added.push(newItem);
    }
  });

  oldArray.forEach((oldItem) => {
    const found = newArray.find((newItem) => newItem[key] === oldItem[key]);
    if (!found) {
      removed.push(oldItem);
    }
  });

  return { added, removed };
}

export default diffArrays;
