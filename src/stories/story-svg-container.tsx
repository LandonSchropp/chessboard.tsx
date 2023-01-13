import { ReactNode } from "react";

import { SVG_BOARD_SIZE, SVG_SQUARE_SIZE } from "../constants";

const SMALL_GRID_SIZE = SVG_SQUARE_SIZE / 4;

function Grid() {

  return <>
    <defs>
      <pattern
        id="small-grid"
        width={ SMALL_GRID_SIZE }
        height={ SMALL_GRID_SIZE }
        patternUnits="userSpaceOnUse"
      >
        <rect
          x={ 0 }
          y={ 0 }
          width={ SMALL_GRID_SIZE }
          height={ SMALL_GRID_SIZE }
          stroke="lightgray"
          strokeWidth={ 0.5 }
          fill="whitesmoke"
        />
      </pattern>
      <pattern
        id="grid"
        width={ SVG_SQUARE_SIZE }
        height={ SVG_SQUARE_SIZE }
        patternUnits="userSpaceOnUse"
      >
        <rect
          x={ 0 }
          y={ 0 }
          width={ SVG_SQUARE_SIZE }
          height={ SVG_SQUARE_SIZE }
          stroke="darkgray"
          strokeWidth={ 0.5 }
          fill="url(#small-grid)"
        />
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#grid)" />
  </>;
}

type StorySVGContainerProps = {
  children: ReactNode
}

export function StorySVGContainer({ children }: StorySVGContainerProps) {
  return <svg className="chessboard" viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }>
    <Grid />
    { children }
  </svg>;
}
