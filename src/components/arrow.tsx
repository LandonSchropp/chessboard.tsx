import "../styles/arrow.sass";

import classNames from "classnames";

import { SVG_SQUARE_SIZE } from "../constants";
import { Arrow as ArrowType, ArrowComponent as ArrowComponentType, Player } from "../types";
import { squareToIndices } from "../utilities/squares";
import { squareToSVGCoordinates } from "../utilities/svg";

type ArrowProps = {
  arrow: ArrowType,
  orientation: Player,
  arrowComponent: ArrowComponentType
}

/**
 * Renders an arrow on top of a chessboard.
 */
export function Arrow({
  arrow,
  orientation,
  arrowComponent: ArrowComponent
}: ArrowProps) {
  const fromIndices = squareToIndices(arrow.from);
  const toIndices = squareToIndices(arrow.from);

  const fromCoordinates = squareToSVGCoordinates(arrow.from, orientation);
  const toCoordinates = squareToSVGCoordinates(arrow.to, orientation);

  const x = Math.min(fromCoordinates[0], toCoordinates[0]);
  const y = Math.min(fromCoordinates[1], toCoordinates[1]);

  const width = SVG_SQUARE_SIZE * (fromIndices[0] - toIndices[0]);
  const height = SVG_SQUARE_SIZE * (fromIndices[1] - toIndices[1]);

  if (arrow.from === arrow.to) {
    throw new Error("An arrow can not begin and end on the same square!");
  }

  const className = classNames("chessboard__arrow", `chessboard__arrow--${ arrow.type }`);

  return <ArrowComponent
    orientation={ orientation }
    x={ x }
    y={ y }
    width={ width }
    height={ height }
    className={ className }
    { ...arrow }
  />;
}
