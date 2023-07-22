import { BISHOP, BLACK, KING, KNIGHT, Move, PAWN, QUEEN, ROOK, WHITE } from "chess.js";

import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  STARTING_POSITION,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../../src/constants";
import { convertChessJsMoveToMove } from "../../src/utilities/chess-js";

describe("convertChessJsMoveToMove", () => {

  const expectations = [
    [ WHITE, KING, WHITE_KING ],
    [ WHITE, QUEEN, WHITE_QUEEN ],
    [ WHITE, ROOK, WHITE_ROOK ],
    [ WHITE, BISHOP, WHITE_BISHOP ],
    [ WHITE, KNIGHT, WHITE_KNIGHT ],
    [ WHITE, PAWN, WHITE_PAWN ],
    [ BLACK, KING, BLACK_KING ],
    [ BLACK, QUEEN, BLACK_QUEEN ],
    [ BLACK, ROOK, BLACK_ROOK ],
    [ BLACK, BISHOP, BLACK_BISHOP ],
    [ BLACK, KNIGHT, BLACK_KNIGHT ],
    [ BLACK, PAWN, BLACK_PAWN ]
  ] as const;

  it.each(expectations)("converts a Chess.js '%s' '%s' move", (color, piece, expected) => {
    const move: Move = {
      from: "a2",
      to: "a4",
      color,
      piece,
      flags: "",
      san: "a4",
      lan: "a4",
      before: STARTING_POSITION,
      after: STARTING_POSITION
    };

    expect(convertChessJsMoveToMove(move)).toEqual({
      from: "a2",
      to: "a4",
      piece: expected
    });
  });
});
