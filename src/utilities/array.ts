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

/**
 * A helper function that determines whether an array includes a value using the provided isEqual
 * function.
 */
export function includes<T>(
  array: T[],
  value: T,
  isEqual: (first: T, second: T) => boolean
): boolean {
  for (const element of array) {
    if (isEqual(element, value)) {
      return true;
    }
  }

  return false;
}

/**
 * Given two arrays and an equality function, this function returns the first array without the
 * elements in the second array. This uses the provided `isEqual` function to determine if two
 * elements are the same.
 */
export function difference<T>(
  array1: T[],
  array2: T[],
  isEqual: (first: T, second: T) => boolean
): T[] {
  const result: T[] = [];

  for (const value of array1) {
    if (!includes(array2, value, isEqual)) {
      result.push(value);
    }
  }

  return result;
}
