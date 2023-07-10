import { ALWAYS_FALSE, matches, negate, NOOP } from "../../src/utilities/function";

describe("NOOP", () => {
  it("returns undefined", () => {
    // eslint-disable-next-line new-cap
    expect(NOOP()).toBeUndefined();
  });
});

describe("ALWAYS_FALSE", () => {
  it("returns false", () => {
    // eslint-disable-next-line new-cap
    expect(ALWAYS_FALSE()).toEqual(false);
  });
});

describe("matches", () => {
  type MatchExample = {
    one: number,
    two: number,
    three: number
  }

  describe("when the match is an empty object", () => {

    it("returns true", () => {
      const matcher = matches<MatchExample>({});
      expect(matcher({ one: 1, two: 2, three: 3 })).toBeTrue();
    });
  });

  describe("when the match has all the keys in the object", () => {

    describe("when the values match", () => {
      it("returns true", () => {
        const matcher = matches<MatchExample>({ one: 1, two: 2, three: 3 });
        expect(matcher({ one: 1, two: 2, three: 3 })).toBeTrue();
      });
    });

    describe("when the values don't match", () => {
      it("returns false", () => {
        const matcher = matches({ one: 1, two: 2, three: 3 });
        expect(matcher({ one: 4, two: 5, three: 6 })).toBeFalse();
      });
    });
  });

  describe("when the match contains a subset of the keys in the object", () => {

    describe("when the values match", () => {
      it("returns true", () => {
        const matcher = matches<MatchExample>({ one: 1, two: 2 });
        expect(matcher({ one: 1, two: 2, three: 3 })).toBeTrue();
      });
    });

    describe("when the values don't match", () => {
      it("returns false", () => {
        const matcher = matches<MatchExample>({ one: 1, two: 2, three: 3 });
        expect(matcher({ one: 4, two: 5, three: 6 })).toBeFalse();
      });
    });
  });
});

describe("negate", () => {
  const identity = (value: boolean) => value;

  describe("when the provided predicate returns true", () => {
    it("returns false", () => {
      expect(negate(identity)(true)).toBeFalse();
    });
  });

  describe("when the provided predicate returns false", () => {
    it("returns true", () => {
      expect(negate(identity)(false)).toBeTrue();
    });
  });
});
