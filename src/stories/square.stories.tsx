import { Square } from "../components/square";
import { BOARD_SIZE } from "../constants";
import { times } from "../utilities/array";
import { StorySVGContainer } from "./story-svg-container";

export default {
  title: "Square",
  component: Square
};

export function LightSquare() {
  return <StorySVGContainer>
    {
      times(BOARD_SIZE, (fileIndex) => {
        return times(BOARD_SIZE, (rankIndex) => {
          return (rankIndex + fileIndex) % 2 === 0
            ? <Square
              key={ `${ fileIndex }-${ rankIndex }` }
              fileIndex={ fileIndex }
              rankIndex={ rankIndex }
            />
            : null;
        });
      })
    }
  </StorySVGContainer>;
}

export function DarkSquare() {
  return <StorySVGContainer>
    {
      times(BOARD_SIZE, (fileIndex) => {
        return times(BOARD_SIZE, (rankIndex) => {
          return (rankIndex + fileIndex) % 2 === 1
            ? <Square
              key={ `${ fileIndex }-${ rankIndex }` }
              fileIndex={ fileIndex }
              rankIndex={ rankIndex }
            />
            : null;
        });
      })
    }
  </StorySVGContainer>;
}
