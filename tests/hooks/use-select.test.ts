import { act, renderHook } from "@testing-library/react";

import { useSelect } from "../../src/hooks/use-select";

describe("useSelect", () => {
  let result: { current: ReturnType<typeof useSelect> };

  beforeEach(() => result = renderHook(() => useSelect()).result);

  describe("when the hook is initially called", () => {

    it("returns null for the selected square", () => {
      expect(result.current[0]).toBeNull();
    });

    it("returns an empty array for the highlights", () => {
      expect(result.current[1]).toEqual([]);
    });

    it("returns a selection handler", () => {
      expect(result.current[2]).toBeFunction();
    });

    it("returns a deselection handler", () => {
      expect(result.current[3]).toBeFunction();
    });
  });

  describe("when a square is selected", () => {
    beforeEach(() => {
      act(() => result.current[2]({ square: "a1" }));
    });

    it("returns the selected square", () => {
      expect(result.current[0]).toEqual("a1");
    });

    it("returns a highlight for the selected square", () => {
      expect(result.current[1]).toEqual([ { square: "a1", shape: "square", type: "select" } ]);
    });

    it("returns a selection handler", () => {
      expect(result.current[2]).toBeFunction();
    });

    it("returns a deselection handler", () => {
      expect(result.current[3]).toBeFunction();
    });
  });

  describe("when a square is deselected", () => {
    beforeEach(() => {
      act(() => result.current[2]({ square: "a1" }));
      act(() => result.current[3]());
    });

    it("returns null for the selected square", () => {
      expect(result.current[0]).toBeNull();
    });

    it("returns an empty array for the highlights", () => {
      expect(result.current[1]).toEqual([]);
    });

    it("returns a selection handler", () => {
      expect(result.current[2]).toBeFunction();
    });

    it("returns a deselection handler", () => {
      expect(result.current[3]).toBeFunction();
    });
  });
});
