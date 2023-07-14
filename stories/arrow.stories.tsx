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

/**
 * The default arrow that's rendered when no modifier keys are pressed.
 */
export const Default: StoryObj<typeof Arrow> = {
  args: {
    arrow: { from: "b2", to: "g7", type: "yellow" },
    orientation: WHITE
  }
};

/**
 * The arrow that's rendered when the alt key is pressed.
 */
export const Alt: StoryObj<typeof Arrow> = merge({}, Default, {
  args: {
    arrow: { type: "blue" }
  }
});

/**
 * The arrow that's rendered when the control key is pressed.
 */
export const Control: StoryObj<typeof Arrow> = merge({}, Default, {
  args: {
    arrow: { type: "red" }
  }
});

/**
 * The arrow that's rendered when the shift key is pressed.
 */
export const Shift: StoryObj<typeof Arrow> = merge({}, Default, {
  args: {
    arrow: { type: "green" }
  }
});
