import { act, renderHook, RenderResult } from "@testing-library/react-hooks";

import { MODIFIERS } from "../../src/constants";
import { useHighlights } from "../../src/hooks/use-highlights";

describe("useHighlights", () => {
  let result: RenderResult<ReturnType<typeof useHighlights>>;

  beforeEach(() => result = renderHook(() => useHighlights()).result);

  describe("when the hook is initially called", () => {
    it("returns an empty array for the highlights", () => {
      expect(result.current[0]).toEqual([]);
    });

    it("returns a toggle function", () => {
      expect(result.current[1]).toBeFunction();
    });

    it("returns a clear function", () => {
      expect(result.current[2]).toBeFunction();
    });
  });

  describe("when the toggle function is called", () => {
    describe("when the square does not contain a highlight", () => {
      describe.each(MODIFIERS)("when the modifier is '%s'", (modifier) => {
        beforeEach(() => act(() => result.current[1]({ square: "a1", modifier })));

        it("highlights the square", () => {
          expect(result.current[0]).toEqual([ { square: "a1", shape: "square", type: modifier } ]);
        });

        it("returns a toggle function", () => {
          expect(result.current[1]).toBeFunction();
        });

        it("returns a clear function", () => {
          expect(result.current[2]).toBeFunction();
        });
      });
    });

    describe.each(MODIFIERS)("when the square contains a '%s' highlight", (oldModifier) => {
      describe.each(MODIFIERS)("when the toggled modifier is '%s'", (newModifier) => {
        beforeEach(() => {
          act(() => result.current[1]({ square: "a1", modifier: oldModifier }));
          act(() => result.current[1]({ square: "a1", modifier: newModifier }));
        });

        if (oldModifier === newModifier) {
          it("unhighlights the square", () => {
            expect(result.current[0]).toEqual([]);
          });
        }
        else {
          it("highlights the square", () => {
            expect(result.current[0]).toEqual([
              { square: "a1", shape: "square", type: newModifier }
            ]);
          });

          it("returns a toggle function", () => {
            expect(result.current[1]).toBeFunction();
          });

          it("returns a clear function", () => {
            expect(result.current[2]).toBeFunction();
          });
        }
      });
    });
  });

  describe("when the clear function is called", () => {
    describe("when none of the squares are highlighted", () => {
      beforeEach(() => act(() => result.current[2]()));

      it("returns an empty array for the highlights", () => {
        expect(result.current[0]).toEqual([]);
      });

      it("returns a toggle function", () => {
        expect(result.current[1]).toBeFunction();
      });

      it("returns a clear function", () => {
        expect(result.current[2]).toBeFunction();
      });
    });

    describe("when some of the squares are highlighted", () => {
      beforeEach(() => {
        act(() => result.current[1]({ square: "a1", modifier: "alt" }));
        act(() => result.current[1]({ square: "a2", modifier: "shift" }));
        act(() => result.current[1]({ square: "a3", modifier: "control" }));
        act(() => result.current[2]());
      });

      it("clears the highlights", () => {
        expect(result.current[0]).toEqual([]);
      });

      it("returns a toggle function", () => {
        expect(result.current[1]).toBeFunction();
      });

      it("returns a clear function", () => {
        expect(result.current[2]).toBeFunction();
      });
    });
  });
});
