/**
 * Calls the provided function transform function the provided number of times and returns the
 * result as an array.
 * @param count The number of times the transform function could be called.
 * @param transform The function whose results determined the returned values.
 * @return Returns the array of results from calling the transform function.
 */
export function times<T>(count: number, transform: (index: number) => T) {
  return Array(count).fill(null).map((value, index) => transform(index));
}
