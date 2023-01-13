import { render, screen } from "@testing-library/react";

import { Squares } from "../../src/components/squares";
import { SQUARES, WHITE } from "../../src/constants";

describe("Squares", () => {
  beforeEach(async () => {
    render(<svg><Squares orientation={ WHITE } /></svg>);
  });

  it("renders all of the squares", async () => {
    const squareElements = await screen.findAllByTestId("square");
    const squares = squareElements.map(element => element.dataset.square);
    expect(squares).toIncludeSameMembers(SQUARES);
  });
});
