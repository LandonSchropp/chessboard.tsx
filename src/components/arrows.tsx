import { Arrow as ArrowType, ArrowComponent, Player } from "../types";
import { Arrow } from "./arrow";

type ArrowsProps = {
  arrows: ArrowType[],
  orientation: Player,
  arrowComponent: ArrowComponent
}

export function Arrows({ arrows, orientation, arrowComponent }: ArrowsProps) {
  return <>
    {
      arrows.map(arrow => {
        return <Arrow
          key={ `${ arrow.from }-${ arrow.to }-${ arrow.type }` }
          arrow={ arrow }
          orientation={ orientation }
          arrowComponent={ arrowComponent }
        />;
      })
    }
  </>;
}
