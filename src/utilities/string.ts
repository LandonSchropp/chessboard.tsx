/**
 * Converts a string of text to kebab case.
 * @param text The text to convert.
 * @returns The text with all non-alphanumeric characters removed and all caps replaced with dashes.
 */
export function convertToKebabCase(text: string): string {
  return text
    .replaceAll(/[^a-z0-9]+/ig, " ")
    .replaceAll(/([A-Z]+)([A-Z][a-z0-9])/g, "$1 $2")
    .replaceAll(/([A-Z]+)/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}
