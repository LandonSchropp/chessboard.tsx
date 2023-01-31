import { ArrowComponentProps } from "../types";
import { isKnightMove } from "../utilities/squares";
import { OrthagonalArrow } from "./orthagonal-arrow";
import { StraightArrow } from "./straight-arrow";

export function MixedArrow({ from, to, ...props }: ArrowComponentProps) {
  return isKnightMove(from, to)
    ? <OrthagonalArrow from={ from } to={ to } { ...props } />
    : <StraightArrow from={ from } to={ to } { ...props } />;
}
