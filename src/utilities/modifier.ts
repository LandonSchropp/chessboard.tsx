import { ColorType, Modifier } from "../types";

/**
 * Converts a modifier key to one of the default highlight colors.
 */
export function modifierToColorType(modifier: Modifier): ColorType {
  return ({
    none: "blue",
    shift: "red",
    alt: "green",
    control: "yellow"
  } as const)[modifier];
}
