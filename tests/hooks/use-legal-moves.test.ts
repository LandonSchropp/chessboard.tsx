import { renderHook, RenderResult } from "@testing-library/react-hooks";

import { STARTING_POSITION, WHITE_PAWN } from "../../src/constants";
import { useLegalMoves } from "../../src/hooks/use-legal-moves";

describe("useLegalMoves", () => {
  let result: RenderResult<ReturnType<typeof useLegalMoves>>;

  describe("when the square is null", () => {
    beforeEach(() => result = renderHook(() => useLegalMoves(STARTING_POSITION, null)).result);

    it("returns an empty array of legal moves", () => {
      expect(result.current[0]).toEqual([]);
    });

    it("returns an empty array of highlights", () => {
      expect(result.current[1]).toEqual([]);
    });
  });

  describe("when a square contains a piece that has legal moves", () => {
    beforeEach(() => result = renderHook(() => useLegalMoves(STARTING_POSITION, "a2")).result);

    it("returns an array of the legal moves", () => {
      expect(result.current[0]).toIncludeSameMembers([
        { from: "a2", to: "a3", piece: WHITE_PAWN },
        { from: "a2", to: "a4", piece: WHITE_PAWN }
      ]);
    });

    it("returns an array of the highlights for the legal moves", () => {
      expect(result.current[1]).toIncludeSameMembers([
        { square: "a3", shape: "dot", type: "legal" },
        { square: "a4", shape: "dot", type: "legal" }
      ]);
    });
  });

  describe("when the square contains a piece that doesn't have legal moves", () => {
    beforeEach(() => result = renderHook(() => useLegalMoves(STARTING_POSITION, "a1")).result);

    it("returns an empty array of legal moves", () => {
      expect(result.current[0]).toEqual([]);
    });

    it("returns an empty array of highlights", () => {
      expect(result.current[1]).toEqual([]);
    });
  });

  describe("when the square contains a piece for the player not taking their turn", () => {
    beforeEach(() => result = renderHook(() => useLegalMoves(STARTING_POSITION, "a7")).result);

    it("returns an empty array of legal moves", () => {
      expect(result.current[0]).toEqual([]);
    });

    it("returns an empty array of highlights", () => {
      expect(result.current[1]).toEqual([]);
    });
  });
});
