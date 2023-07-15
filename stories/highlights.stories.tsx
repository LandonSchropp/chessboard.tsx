import { StoryObj } from "@storybook/react";
import { sample } from "lodash";
import React, { useEffect, useState } from "react";

import { Highlights as HighlightsComponent } from "../src/components/highlights";
import { SQUARES, WHITE } from "../src/constants";
import { Player } from "../src/types";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Highlights",
  component: HighlightsComponent,
  decorators: [ SVGBoardDecorator ]
};

const TYPES = [ "red", "green", "blue", "yellow" ] as const;
const SHAPES = [ "square", "circle", "dot" ] as const;

const HIGHLIGHTS = SQUARES.map((square, index) => {
  const shape = SHAPES[index % SHAPES.length]!;
  const type = TYPES[index % TYPES.length]!;

  return { square, shape, type };
});

/**
 * A collection of all of the possible highlight configurations.
 */
export const Highlights: StoryObj<typeof HighlightsComponent> = {
  args: {
    highlights: HIGHLIGHTS,
    orientation: WHITE
  }
};

type DiscoInternalProps = {
  orientation: Player
}

function DiscoInternal({ orientation }: DiscoInternalProps) {
  const [ , setRandomValue ] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => setRandomValue(Math.floor(Math.random() * 100)), 1000);
    return () => clearInterval(interval);
  }, []);

  const highlights = SQUARES.map((square) => {
    return { square, shape: "square" as const, type: sample(TYPES)! };
  });

  return <HighlightsComponent highlights={ highlights } orientation={ orientation } />;
}

/**
 * 🕺 Everybody dance now! 🕺
 */
export const Disco: StoryObj<typeof HighlightsComponent> = {
  args: {
    orientation: WHITE
  },
  render: ({ orientation }) => <DiscoInternal orientation={ orientation } />
};
