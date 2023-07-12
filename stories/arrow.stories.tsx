import type { Meta, StoryObj } from "@storybook/react";
import { merge } from "lodash";

import { Arrow } from "../src/components/arrow";
import { WHITE } from "../src/constants";
import { SVGBoardDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Arrow",
  component: Arrow,
  decorators: [ SVGBoardDecorator ]
} satisfies Meta;

export const Default: StoryObj<typeof Arrow> = {
  args: {
    arrow: { from: "b2", to: "g7", type: "yellow" },
    orientation: WHITE
  }
};

export const Alt: StoryObj<typeof Arrow> = merge({}, Default, {
  args: {
    arrow: { type: "blue" }
  }
});

export const Control: StoryObj<typeof Arrow> = merge({}, Default, {
  args: {
    arrow: { type: "red" }
  }
});

export const Shift: StoryObj<typeof Arrow> = merge({}, Default, {
  args: {
    arrow: { type: "green" }
  }
});
