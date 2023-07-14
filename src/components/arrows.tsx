import { Arrow as ArrowType, Player } from "../types";
import { Arrow } from "./arrow";

type ArrowsProps = {

  /** The arrow objects to render. */
  arrows: ArrowType[],

  /** The player the board is oriented toward. */
  orientation: Player
}

/**
 * Renders multiple arrows.
 */
export function Arrows({ arrows, orientation }: ArrowsProps) {
  return <>
    {
      arrows.map(arrow => {
        return <Arrow
          key={ `${ arrow.from }-${ arrow.to }-${ arrow.type }` }
          arrow={ arrow }
          orientation={ orientation }
        />;
      })
    }
  </>;
}
