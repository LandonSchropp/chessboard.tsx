import { render, screen } from "@testing-library/react";

import { Square } from "../../src/components/square";
import { WHITE } from "../../src/constants";

describe("Square", () => {
  let square: HTMLElement;

  describe("when the square is dark", () => {
    beforeEach(async () => {
      render(<svg><Square square="f2" orientation={ WHITE } /></svg>);
      square = await screen.findByTestId("square");
    });

    it("places the square on the correct coordinates", async () => {
      expect(square).toHaveAttribute("x", "500");
      expect(square).toHaveAttribute("y", "600");
    });

    it("includes a square class", () => {
      expect(square).toHaveClass("chessboard__square");
    });

    it("includes a square color class", () => {
      expect(square).toHaveClass("chessboard__square--dark");
    });

    it("sets the data attributes", () => {
      expect(square).toHaveAttribute("data-square", "f2");
      expect(square).toHaveAttribute("data-square-color", "dark");
    });
  });

  describe("when the square is light", () => {
    beforeEach(async () => {
      render(<svg><Square square="f7" orientation={ WHITE } /></svg>);
      square = await screen.findByTestId("square");
    });

    it("places the square on the correct coordinates", async () => {
      expect(square).toHaveAttribute("x", "500");
      expect(square).toHaveAttribute("y", "100");
    });

    it("includes a square class", () => {
      expect(square).toHaveClass("chessboard__square");
    });

    it("includes a square color class", () => {
      expect(square).toHaveClass("chessboard__square--light");
    });

    it("sets the data attributes", () => {
      expect(square).toHaveAttribute("data-square", "f7");
      expect(square).toHaveAttribute("data-square-color", "light");
    });
  });
});
