import { HighlightComponentProps } from "../types";

/**
 * A highlight in the shape of a square.
 * @param {HighlightComponentProps} props The component's props.
 */
export function SquareHighlight({
  className,
  square,
  orientation,
  squareColor,
  type,
  ...attributes
}: HighlightComponentProps) {
  return <rect
    className={ className }
    data-square={ square }
    data-type={ type }
    data-square-color={ squareColor }
    data-orientation={ orientation }
    { ...attributes }
  />;
}
