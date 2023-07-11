import type { Meta, StoryObj } from "@storybook/react";
import { merge } from "lodash";

import { Arrow } from "../src/components/arrow";
import { WHITE } from "../src/constants";

type Story = StoryObj<typeof Arrow>;

export default {
  title: "Arrow",
  component: Arrow
} satisfies Meta;

export const Default: Story = {
  args: {
    arrow: { from: "b2", to: "g7", type: "yellow" },
    orientation: WHITE
  }
};

export const Alt: Story = merge({}, Default, {
  args: {
    arrow: { type: "blue" }
  }
});

export const Control: Story = merge({}, Default, {
  args: {
    arrow: { type: "red" }
  }
});

export const Shift: Story = merge({}, Default, {
  args: {
    arrow: { type: "green" }
  }
});
