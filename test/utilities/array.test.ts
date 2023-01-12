import { times } from "../../src/utilities/array";

function double(value: number) {
  return value * 2;
}

describe("times", () => {
  describe("when the count is negative", () => {

    it("throws an error", () => {
      expect(() => times(-1, double)).toThrow();
    });
  });

  describe("when the count is 0", () => {

    it("returns an empty array", () => {
      expect(times(0, double)).toEqual([]);
    });
  });

  describe("when the count is positive", () => {

    it("returns an array whose values are the indices transformed by the provided function", () => {
      expect(times(3, double)).toEqual([ 0, 2, 4 ]);
    });
  });
});
