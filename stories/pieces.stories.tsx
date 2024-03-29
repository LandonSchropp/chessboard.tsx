import { StoryObj } from "@storybook/react";
import { merge } from "lodash";
import React, { useEffect, useState } from "react";

import { Pieces } from "../src/components/pieces";
import { BLACK, EMPTY_POSITION, PIECES, STARTING_POSITION, WHITE } from "../src/constants";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Pieces",
  component: Pieces,
  decorators: [ SVGBoardDecorator ]
};

/**
 * No pieces.
 */
export const Empty: StoryObj<typeof Pieces> = {
  args: {
    fen: EMPTY_POSITION,
    orientation: WHITE
  }
};

/**
 * The starting position from White's perspective.
 */
export const WhiteStartingPosition: StoryObj<typeof Pieces> = merge({}, Empty, {
  name: "Starting Position (White)",
  args: {
    fen: STARTING_POSITION
  }
});

/**
 * The starting position from Black's perspective.
 */
export const BlackStartingPosition: StoryObj<typeof Pieces> = merge({}, WhiteStartingPosition, {
  name: "Starting Position (Black)",
  args: {
    orientation: BLACK
  }
});

function AnimatedPieces({ fens }: { fens: string[] }) {
  const [ index, setIndex ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(oldIndex => (oldIndex + 1) % fens.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [ fens ]);

  return <Pieces
    fen={ fens[index]! }
    orientation={ WHITE }
  />;
}

/**
 * The Italian opening animated.
 */
export const ItalianAnimation: StoryObj<typeof Pieces> = merge({}, Empty, {
  name: "Italian Opening (Animated)",
  render: () => {
    const fens = [
      STARTING_POSITION,
      "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
      "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3"
    ];

    return <AnimatedPieces fens={ fens } />;
  }
});

/**
 * Castling animations.
 */
export const CastlingAnimation: StoryObj<typeof Pieces> = merge({}, Empty, {
  name: "Castling (Animated)",
  render: () => {
    const fens = [
      "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R b KQkq - 0 1",
      "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R4RK1 b kq - 1 1",
      "r4rk1/pppppppp/8/8/8/8/PPPPPPPP/R4RK1 w - - 2 2",
      "r4rk1/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQ - 3 2",
      "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R b KQkq - 4 3",
      "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/2KR3R b kq - 5 3",
      "2kr3r/pppppppp/8/8/8/8/PPPPPPPP/2KR3R w KQ - 6 4",
      "2kr3r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w - - 7 4"
    ];

    return <AnimatedPieces fens={ fens } />;
  }
});

/**
 * Appearing and disappearing animations.
 */
export const AppearingAndDisappearingAnimation: StoryObj<typeof Pieces> = merge({}, Empty, {
  name: "Appearing and Disappearing (Animated)",
  render: () => {
    const fens = [
      EMPTY_POSITION,
      "n7/n7/n7/n7/n7/n7/n7/n7 w - - 0 1",
      "nN6/nN6/nN6/nN6/nN6/nN6/nN6/nN6 w - - 0 1",
      "nNb5/nNb5/nNb5/nNb5/nNb5/nNb5/nNb5/nNb5 w - - 0 1",
      "nNbB4/nNbB4/nNbB4/nNbB4/nNbB4/nNbB4/nNbB4/nNbB4 w - - 0 1",
      "nNbBr3/nNbBr3/nNbBr3/nNbBr3/nNbBr3/nNbBr3/nNbBr3/nNbBr3 w - - 0 1",
      "nNbBrR2/nNbBrR2/nNbBrR2/nNbBrR2/nNbBrR2/nNbBrR2/nNbBrR2/nNbBrR2 w - - 0 1",
      "nNbBrRq1/nNbBrRq1/nNbBrRq1/nNbBrRq1/nNbBrRq1/nNbBrRq1/nNbBrRq1/nNbBrRq1 w - - 0 1",
      "nNbBrRqQ/nNbBrRqQ/nNbBrRqQ/nNbBrRqQ/nNbBrRqQ/nNbBrRqQ/nNbBrRqQ/nNbBrRqQ w - - 0 1",
      "1NbBrRqQ/1NbBrRqQ/1NbBrRqQ/1NbBrRqQ/1NbBrRqQ/1NbBrRqQ/1NbBrRqQ/1NbBrRqQ w - - 0 1",
      "2bBrRqQ/2bBrRqQ/2bBrRqQ/2bBrRqQ/2bBrRqQ/2bBrRqQ/2bBrRqQ/2bBrRqQ w - - 0 1",
      "3BrRqQ/3BrRqQ/3BrRqQ/3BrRqQ/3BrRqQ/3BrRqQ/3BrRqQ/3BrRqQ w - - 0 1",
      "4rRqQ/4rRqQ/4rRqQ/4rRqQ/4rRqQ/4rRqQ/4rRqQ/4rRqQ w - - 0 1",
      "5RqQ/5RqQ/5RqQ/5RqQ/5RqQ/5RqQ/5RqQ/5RqQ w - - 0 1",
      "6qQ/6qQ/6qQ/6qQ/6qQ/6qQ/6qQ/6qQ w - - 0 1",
      "7Q/7Q/7Q/7Q/7Q/7Q/7Q/7Q w - - 0 1"
    ];

    return <AnimatedPieces fens={ fens } />;
  }
});

/**
 * Capturing animations.
 */
export const CapturingAnimation: StoryObj<typeof Pieces> = merge({}, Empty, {
  name: "Capturing (Animated)",
  render: () => {
    const fens = [
      "KB6/Q5p1/5N2/6R1/1r6/2n5/1P5q/6bk w - - 0 1",
      "KB6/Q5p1/5N2/6R1/1r6/2P5/7q/6bk b - - 0 1",
      "KB6/Q7/5p2/6R1/1r6/2P5/7q/6bk w - - 0 2",
      "KB6/Q7/5p2/6R1/1P6/8/7q/6bk b - - 0 2",
      "KB6/Q7/8/6p1/1P6/8/7q/6bk w - - 0 3",
      "K7/Q7/8/6p1/1P6/8/7B/6bk b - - 0 3",
      "K7/b7/8/6p1/1P6/8/7B/7k w - - 0 4",
      "8/K7/8/6p1/1P6/8/7B/7k b - - 0 4",
      "8/K7/8/6p1/1P6/8/7k/8 w - - 0 5",
      "8/K7/8/6p1/1P6/8/7k/8 w - - 0 5",
      "8/K7/8/6p1/1P6/8/7k/8 w - - 0 5",
      "8/K7/8/6p1/1P6/8/7k/8 w - - 0 5"
    ];

    return <AnimatedPieces fens={ fens } />;
  }
});

function RandomAnimationInternal() {
  const [ fen, setFEN ] = useState(EMPTY_POSITION);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPiecePlacement = [
        ...[ ...PIECES ].sort(() => 0.5 - Math.random()).slice(0, 8),
        ...new Array(56).fill("1")
      ]
        .sort(() => 0.5 - Math.random())
        .join("")
        .replace(/.{8}(?!$)/g, "$&/");

      setFEN(EMPTY_POSITION.replace(EMPTY_POSITION.split(" ")[0]!, randomPiecePlacement));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Pieces
    fen={ fen }
    orientation={ WHITE }
  />;
}

/**
 * The pieces randomly appearing, disappearing and moving.
 */
export const RandomAnimation: StoryObj<typeof Pieces> = merge({}, Empty, {
  name: "Random (Animated)",
  render: () => {
    return <RandomAnimationInternal />;
  }
});
