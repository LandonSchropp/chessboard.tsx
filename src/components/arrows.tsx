import { Arrow as ArrowType, Player } from "../types";
import { Arrow } from "./arrow";

type ArrowsProps = {
  arrows: ArrowType[],
  orientation: Player
}

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
