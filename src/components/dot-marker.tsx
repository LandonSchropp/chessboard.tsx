import { MarkerComponentProps } from "../types";

const DOT_RADIUS = 0.2;

/**
 * A marker in the shape of a dot.
 * @param {MarkerComponentProps} props The component's props.
 */
export function DotMarker({
  square,
  orientation,
  squareColor,
  type,
  x,
  y,
  width,
  height,
  ...attributes
}: MarkerComponentProps) {
  return <ellipse
    cx={ x + width / 2 }
    cy={ y + height / 2 }
    rx={ width * DOT_RADIUS }
    ry={ width * DOT_RADIUS }
    data-square={ square }
    data-type={ type }
    data-square-color={ squareColor }
    data-orientation={ orientation }
    { ...attributes }
  />;
}
