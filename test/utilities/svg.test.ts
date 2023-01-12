import { BLACK, WHITE } from "../../src/constants";
import { squareToSVGCoordinates } from "../../src/utilities/svg";

describe("squareToSVGCoordinates", () => {

  describe("when the board is oriented toward white", () => {

    it("returns the SVG coordinates of the square", () => {
      expect(squareToSVGCoordinates("a5", WHITE)).toEqual([ 0, 300 ]);
      expect(squareToSVGCoordinates("d8", WHITE)).toEqual([ 300, 0 ]);
      expect(squareToSVGCoordinates("c2", WHITE)).toEqual([ 200, 600 ]);
    });
  });

  describe("when the board is oriented toward black", () => {

    it("returns the SVG coordinates of the square", () => {
      expect(squareToSVGCoordinates("h4", BLACK)).toEqual([ 0, 300 ]);
      expect(squareToSVGCoordinates("e1", BLACK)).toEqual([ 300, 0 ]);
      expect(squareToSVGCoordinates("f7", BLACK)).toEqual([ 200, 600 ]);
    });
  });
});
