import { act, renderHook, RenderResult } from "@testing-library/react-hooks";

import { BLACK_PAWN, STARTING_POSITION, WHITE_PAWN } from "../../src/constants";
import { useLastMove } from "../../src/hooks/use-last-move";

describe("useLastMove", () => {
  let result: RenderResult<ReturnType<typeof useLastMove>>;

  describe("when no move has been played", () => {
    beforeEach(() => result = renderHook(() => useLastMove()).result);

    it("returns null for the last move", () => {
      expect(result.current[0]).toBeNull();
    });

    it("returns an empty array of highlights", () => {
      expect(result.current[1]).toEqual([]);
    });

    it("returns the updateMove function", () => {
      expect(result.current[2]).toBeFunction();
    });
  });

  describe("when the updateMove function is called with a move", () => {
    beforeEach(() => {
      result = renderHook(() => useLastMove()).result;
      act(() => result.current[2]({ from: "e2", to: "e4", piece: WHITE_PAWN }));
    });

    it("returns the last move", () => {
      expect(result.current[0]).toEqual({ from: "e2", to: "e4", piece: WHITE_PAWN });
    });

    it("returns the highlights for the last move", () => {
      expect(result.current[1]).toIncludeSameMembers([
        { square: "e2", shape: "square", type: "lastMove" },
        { square: "e4", shape: "square", type: "lastMove" }
      ]);
    });

    it("returns the updateMove function", () => {
      expect(result.current[2]).toBeFunction();
    });
  });

  describe("when updateMove is called with an additional move", () => {
    beforeEach(() => {
      result = renderHook(() => useLastMove()).result;
      act(() => result.current[2]({ from: "e2", to: "e4", piece: WHITE_PAWN }));
      act(() => result.current[2]({ from: "e7", to: "e5", piece: BLACK_PAWN }));
    });

    it("returns the last move", () => {
      expect(result.current[0]).toEqual({ from: "e7", to: "e5", piece: BLACK_PAWN });
    });

    it("returns the highlights for the last move", () => {
      expect(result.current[1]).toIncludeSameMembers([
        { square: "e7", shape: "square", type: "lastMove" },
        { square: "e5", shape: "square", type: "lastMove" }
      ]);
    });

    it("returns the updateMove function", () => {
      expect(result.current[2]).toBeFunction();
    });
  });

  describe("when the FEN is cleared after a move is made", () => {
    beforeEach(() => {
      result = renderHook(() => useLastMove()).result;
      act(() => result.current[2]({ from: "e2", to: "e4", piece: WHITE_PAWN }));
      act(() => result.current[2](null));
    });

    it("returns null for the last move", () => {
      expect(result.current[0]).toBeNull();
    });

    it("returns an empty array of highlights", () => {
      expect(result.current[1]).toEqual([]);
    });

    it("returns the updateMove function", () => {
      expect(result.current[2]).toBeFunction();
    });
  });
});
