import {
  addConstant,
  distance,
  lengthenSegment,
  radiansToDegrees
} from "../../src/utilities/math";

describe("radiansToDegrees", () => {

  describe("when the value is 0", () => {

    it("returns 0", () => {
      expect(radiansToDegrees(0)).toBeCloseTo(0, 4);
    });
  });

  describe("when the value is pi", () => {

    it("returns 180", () => {
      expect(radiansToDegrees(Math.PI)).toBeCloseTo(180, 4);
    });
  });

  describe("when the value is 1", () => {

    it("returns about 57 degrees", () => {
      expect(radiansToDegrees(1)).toBeCloseTo(57.2958, 4);
    });
  });
});

describe("distance", () => {

  it("returns the pythagorean distance between the two coordinates", () => {
    expect(distance([ 1, 2 ], [ 4, 6 ])).toEqual(5);
  });
});

describe("addConstant", () => {

  it("returns the sum of the vector and the constant", () => {
    expect(addConstant([ 1, 2 ], 2)).toEqual([ 3, 4 ]);
  });
});

describe("lengthenSegment", () => {

  describe("when the amount is 0", () => {

    it("returns the original to", () => {
      expect(lengthenSegment([ 1, 2 ], [ 4, 6 ], 0)).toEqual([ 4, 6 ]);
    });
  });

  describe("when the amount is positive", () => {

    it("lengthens the segment", () => {
      expect(lengthenSegment([ 1, 2 ], [ 4, 6 ], 5)).toEqual([ 7, 10 ]);
    });
  });

  describe("when the amount is negative", () => {

    it("shrinks the segment", () => {
      expect(lengthenSegment([ 1, 2 ], [ 7, 10 ], -5)).toEqual([ 4, 6 ]);
    });
  });
});
