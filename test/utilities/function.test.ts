import { ALWAYS_FALSE, NOOP } from "../../src/utilities/function";

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
