import type { Meta, StoryObj } from "@storybook/react";

import { Arrows as ArrowsComponent } from "../src/components/arrows";
import { WHITE } from "../src/constants";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Arrows",
  component: ArrowsComponent,
  decorators: [ SVGBoardDecorator ]
} satisfies Meta;

export const Arrows: StoryObj<typeof ArrowsComponent> = {
  args: {
    arrows: [
      { from: "a1", to: "a8", type: "yellow" },
      { from: "b2", to: "c4", type: "blue" },
      { from: "b2", to: "d3", type: "red" },
      { from: "a1", to: "h1", type: "green" }
    ],
    orientation: WHITE
  }
};
