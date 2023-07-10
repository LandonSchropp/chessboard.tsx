import { Arrow } from "../src/components/arrow";
import { BLACK, BOARD_SIZE, SQUARES, WHITE } from "../src/constants";

export default {
  title: "Arrow",
  component: Arrow
};

const TYPES = [ "red", "green", "blue", "yellow" ];

export function WhiteArrows() {
  const FROM = "c3" as const;

  return <>
    {
      SQUARES
        .filter((square, index) => square !== FROM && (index + Math.floor(index / 8)) % 2 === 0)
        .map((square) => {
          const arrow = { from: FROM, to: square, type: "blue" };
          return <Arrow key={ square } arrow={ arrow } orientation={ WHITE } />;
        })
    }
  </>;
}

WhiteArrows.storyName = "Arrows From c2 (White)";

export function BlackArrows() {
  const FROM = "c3" as const;

  return <>
    {
      SQUARES
        .filter((square, index) => square !== FROM && (index + Math.floor(index / 8)) % 2 === 0)
        .map((square) => {
          const arrow = { from: FROM, to: square, type: "green" };
          return <Arrow key={ square } arrow={ arrow } orientation={ BLACK } />;
        })
    }
  </>;
}

BlackArrows.storyName = "Arrows From c2 (Black)";

export function KnightArrows() {
  const tuples = [
    [ "a8", "c7" ],
    [ "d8", "f7" ],
    [ "g8", "h6" ],
    [ "g5", "h3" ],
    [ "f1", "h2" ],
    [ "c1", "e2" ],
    [ "a1", "b3" ],
    [ "a4", "b6" ],
    [ "c3", "d5" ],
    [ "e4", "f6" ]
  ] as const;

  const arrows = tuples
    .map(([ from, to ], index) => {
      const type = TYPES[index % TYPES.length]!;
      return [
        { from, to, type },
        { from: to, to: from, type }
      ];
    }).flat();

  return <>
    {
      arrows.map(arrow => {
        return <Arrow key={ arrow.from } arrow={ arrow } orientation={ BLACK } />;
      })
    }
  </>;
}

export function ColoredArrows() {
  const arrows = [];

  for (let index = 0; index < SQUARES.length; index++) {
    const from = SQUARES[index];
    const to = SQUARES[index + 1];

    if (from && to && from[0] === to[0]) {
      const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;
      arrows.push({ from, to, type });
    }
  }

  return <>
    {
      arrows.map(arrow => {
        return <Arrow
          key={ arrow.from }
          arrow={ arrow }
          orientation={ WHITE }
        />;
      })
    }
  </>;
}
