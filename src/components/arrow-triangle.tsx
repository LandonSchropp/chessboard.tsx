import { SVG_SQUARE_SIZE } from "../constants";
import { Vector } from "../types";
import { addConstant, radiansToDegrees } from "../utilities/math";

const TRIANGLE_WIDTH = 0.6 * SVG_SQUARE_SIZE;
export const TRIANGLE_HEIGHT = 0.45 * SVG_SQUARE_SIZE;

type ArrowTriangleProps = {
  from: Vector,
  to: Vector
}

export function ArrowTriangle({ from, to }: ArrowTriangleProps) {
  const [ fromX, fromY ] = addConstant(from, SVG_SQUARE_SIZE * 0.5);
  const [ toX, toY ] = addConstant(to, SVG_SQUARE_SIZE * 0.5);

  const height = toX - fromX < 0 ? -TRIANGLE_HEIGHT : TRIANGLE_HEIGHT;

  const trianglePoints = [
    [ toX, toY ],
    [ toX - TRIANGLE_WIDTH / 2, toY + height ],
    [ toX + TRIANGLE_WIDTH / 2, toY + height ]
  ];

  const rotationAngle = radiansToDegrees(Math.atan((toY - fromY) / (toX - fromX))) + 90;

  return <polygon
    transform={ `rotate(${ rotationAngle } ${ toX } ${ toY })` }
    className="chessboard__arrow-triangle"
    points={ trianglePoints.map(point => point.join(",")).join(" ") }
  />;
}
