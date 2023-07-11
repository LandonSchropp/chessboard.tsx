import type { Meta, StoryObj } from "@storybook/react";

import { Arrows as ArrowsComponent } from "../src/components/arrows";
import { WHITE } from "../src/constants";

type Story = StoryObj<typeof ArrowsComponent>;

export default {
  title: "Arrows",
  component: ArrowsComponent
} satisfies Meta;

export const Arrows: Story = {
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
