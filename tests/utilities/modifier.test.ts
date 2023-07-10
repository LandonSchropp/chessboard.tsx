import { modifierToColorType } from "../../src/utilities/modifier";

describe("modifierToColorType", () => {

  describe("when the modifier is 'none'", () => {
    it("returns 'blue'", () => {
      expect(modifierToColorType("none")).toBe("blue");
    });
  });

  describe("when the modifier is 'shift'", () => {
    it("returns 'red'", () => {
      expect(modifierToColorType("shift")).toBe("red");
    });
  });

  describe("when the modifier is 'alt'", () => {
    it("returns 'green'", () => {
      expect(modifierToColorType("alt")).toBe("green");
    });
  });

  describe("when the modifier is 'control'", () => {
    it("returns 'yellow'", () => {
      expect(modifierToColorType("control")).toBe("yellow");
    });
  });
});
