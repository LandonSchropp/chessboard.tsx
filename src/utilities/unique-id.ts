let id = 0;

/**
 * Returns a unique ID every time it's called.
 */
export function uniqueId(prefix: string): string {
  id++;
  return `${ prefix }${ id }`;
}
