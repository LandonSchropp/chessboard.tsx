/** A function that does nothing. */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = () => {};

/** A function that returns `false`. */
export const ALWAYS_FALSE = () => false;

/**
 * Returns a predicate function that returns true if its given value matches the provided object.
 */
export function matches<T extends object>(match: Partial<T>): (value: T) => boolean {
  return (value) => {
    for (const key in match) {
      if (match[key] !== value[key]) {
        return false;
      }
    }

    return true;
  };
}

/**
 * Given a predicate function, this returns a negated version of the predicate.
 * object.
 */
export function negate<T extends unknown[]>(
  predicate: (...parameters: T) => boolean
): (...parameters: T) => boolean {
  return (...parameters) => !predicate(...parameters);
}
