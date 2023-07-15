import { StoryObj } from "@storybook/react";
import { merge } from "lodash";

import { Highlight } from "../src/components/highlight";
import { WHITE } from "../src/constants";
import { SVGSquareDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Highlight",
  component: Highlight,
  decorators: [ SVGSquareDecorator ],
  parameters: {
    layout: "centered"
  }
};

export const SquareHighlight: StoryObj<typeof Highlight> = {
  args: {
    highlight: { square: "h1", shape: "square", type: "red" },
    orientation: WHITE
  }
};

export const CircleHighlight = merge({}, SquareHighlight, {
  args: {
    highlight: { shape: "circle" }
  }
});

export const DotHighlight = merge({}, SquareHighlight, {
  args: {
    highlight: { shape: "dot" }
  }
});
