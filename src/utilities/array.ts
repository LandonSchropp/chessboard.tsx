/**
 * Calls the provided function transform function the provided number of times and returns the
 * result as an array.
 * @param count The number of times the transform function could be called.
 * @param transform The function whose results determined the returned values.
 * @returns Returns the array of results from calling the transform function.
 */
export function times<T>(count: number, transform: (index: number) => T) {
  return Array(count).fill(null).map((_value, index) => transform(index));
}

/**
 * Returns the value with the minimum result.
 * @param array The array to search.
 * @param minimum The function whose results determines how the value of the object is defined.
 * @returns The minimum value in the array, or undefined if there is no minimum value.
 */
export function minBy<T>(array: T[], transform: (value: T) => number): T | undefined {
  let accumulator: T | undefined;
  let accumulatedValue = Number.POSITIVE_INFINITY;

  for (const value of array) {
    const transformedValue = transform(value);

    if (transformedValue < accumulatedValue) {
      accumulator = value;
      accumulatedValue = transformedValue;
    }
  }

  return accumulator;
}
