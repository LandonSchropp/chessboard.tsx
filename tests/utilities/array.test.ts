import { difference, includes, minBy, times } from "../../src/utilities/array";

type TestObject = { value: number };

function double(value: number) {
  return value * 2;
}

function isEqual(first: TestObject, second: TestObject) {
  return first.value === second.value;
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

describe("minBy", () => {
  describe("when the array is empty", () => {
    it("returns undefined", () => {
      expect(minBy([], value => value)).toBeUndefined();
    });
  });

  describe("when the transform function only returns Number.POSITIVE_INFINITY", () => {
    it("returns undefined", () => {
      expect(minBy([ 1, 2, 3 ], () => Number.POSITIVE_INFINITY)).toBeUndefined();
    });
  });

  describe("when the transform function returns values less than Number.POSITIVE_INFINITY", () => {
    it("returns the minimum value", () => {
      expect(minBy([ 1, 2, 3 ], value => -value)).toEqual(3);
    });
  });
});

describe("includes", () => {
  describe("when the array is empty", () => {
    it("returns false", () => {
      expect(includes([], { value: 1 }, isEqual)).toBe(false);
    });
  });

  describe("when the array does not include the value", () => {
    it("returns false", () => {
      const array = [ { value: 1 }, { value: 2 }, { value: 3 } ];
      expect(includes(array, { value: 4 }, isEqual)).toBeFalse();
    });
  });

  describe("when the array includes the value", () => {
    it("returns true", () => {
      const array = [ { value: 1 }, { value: 2 }, { value: 3 } ];

      expect(includes(array, { value: 1 }, isEqual)).toBeTrue();
      expect(includes(array, { value: 2 }, isEqual)).toBeTrue();
      expect(includes(array, { value: 3 }, isEqual)).toBeTrue();
    });
  });
});

describe("difference", () => {

  describe("when both arrays are empty", () => {
    it("returns an empty array", () => {
      expect(difference([], [], isEqual)).toEqual([]);
    });
  });

  describe("when the first array is empty", () => {
    it("returns the second array", () => {
      const first = [ { value: 1 }, { value: 2 }, { value: 3 } ];
      expect(difference(first, [], isEqual)).toEqual(first);
    });
  });

  describe("when the second array is empty", () => {
    it("returns the first array", () => {
      const second = [ { value: 1 }, { value: 2 }, { value: 3 } ];
      expect(difference(second, [], isEqual)).toEqual(second);
    });
  });

  describe("when the arrays are the same", () => {
    it("returns an empty array", () => {
      const array = [ { value: 1 }, { value: 2 }, { value: 3 } ];
      expect(difference(array, array, isEqual)).toEqual([]);
    });
  });

  describe("when the first array is a subset of the second array", () => {

    it("returns an empty array", () => {
      const first = [ { value: 1 }, { value: 2 }, { value: 3 } ];
      const second = [ ...first, { value: 4 }, { value: 5 } ];

      expect(difference(first, second, isEqual)).toEqual([]);
    });
  });

  describe("when the second array is a subset of the first array", () => {

    it("returns the items in the first array that are not in the second array", () => {
      const second = [ { value: 1 }, { value: 2 }, { value: 3 } ];
      const first = [ { value: 4 }, ...second, { value: 5 } ];

      expect(difference(first, second, isEqual)).toEqual([ { value: 4 }, { value: 5 } ]);
    });
  });
});
