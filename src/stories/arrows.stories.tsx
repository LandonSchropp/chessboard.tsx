import { Arrows as ArrowsComponent } from "../components/arrows";
import { BOARD_SIZE, SQUARES, WHITE } from "../constants";

export default {
  title: "Arrows",
  component: ArrowsComponent
};

const TYPES = [ "red", "green", "blue", "yellow" ] as const;

export function Arrows() {
  const FROM = "a1" as const;

  const arrows = SQUARES.filter(to => to !== FROM).map((to, index) => {
    const type = TYPES[(index + Math.floor(index / BOARD_SIZE)) % TYPES.length]!;

    return { from: FROM, to, type };
  });

  return <ArrowsComponent arrows={ arrows } orientation={ WHITE } />;
}
