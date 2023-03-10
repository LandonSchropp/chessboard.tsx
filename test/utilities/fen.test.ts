import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  EMPTY_POSITION,
  STARTING_POSITION,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../../src/constants";
import { parseFENPosition } from "../../src/utilities/fen";

const PARSED_STARTING_POSITION = [
  { square: "a8", piece: BLACK_ROOK },
  { square: "b8", piece: BLACK_KNIGHT },
  { square: "c8", piece: BLACK_BISHOP },
  { square: "d8", piece: BLACK_QUEEN },
  { square: "e8", piece: BLACK_KING },
  { square: "f8", piece: BLACK_BISHOP },
  { square: "g8", piece: BLACK_KNIGHT },
  { square: "h8", piece: BLACK_ROOK },
  { square: "a7", piece: BLACK_PAWN },
  { square: "b7", piece: BLACK_PAWN },
  { square: "c7", piece: BLACK_PAWN },
  { square: "d7", piece: BLACK_PAWN },
  { square: "e7", piece: BLACK_PAWN },
  { square: "f7", piece: BLACK_PAWN },
  { square: "g7", piece: BLACK_PAWN },
  { square: "h7", piece: BLACK_PAWN },
  { square: "a2", piece: WHITE_PAWN },
  { square: "b2", piece: WHITE_PAWN },
  { square: "c2", piece: WHITE_PAWN },
  { square: "d2", piece: WHITE_PAWN },
  { square: "e2", piece: WHITE_PAWN },
  { square: "f2", piece: WHITE_PAWN },
  { square: "g2", piece: WHITE_PAWN },
  { square: "h2", piece: WHITE_PAWN },
  { square: "a1", piece: WHITE_ROOK },
  { square: "b1", piece: WHITE_KNIGHT },
  { square: "c1", piece: WHITE_BISHOP },
  { square: "d1", piece: WHITE_QUEEN },
  { square: "e1", piece: WHITE_KING },
  { square: "f1", piece: WHITE_BISHOP },
  { square: "g1", piece: WHITE_KNIGHT },
  { square: "h1", piece: WHITE_ROOK }
];

describe("parseFENPosition", () => {

  describe("when the FEN string is empty", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition("")).toThrow();
    });
  });

  describe("when the FEN position contains invalid characters", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("K", "L"))).toThrow();
    });
  });

  describe("when the FEN has too few items in the rank", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("PP", "P"))).toThrow();
    });
  });

  describe("when the FEN has too many items in the rank", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("PP", "2P"))).toThrow();
    });
  });

  describe("when the FEN has too few files", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("8/", ""))).toThrow();
    });
  });

  describe("when the FEN has too many files", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("8/", "8/8/"))).toThrow();
    });
  });

  describe("when the FEN contains an invalid player", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("w", "W"))).toThrow();
    });
  });

  describe("when the FEN contains an invalid castling position", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("-", "qq"))).toThrow();
    });
  });

  describe("when the FEN contains an invalid half move clock", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("0", "-1"))).toThrow();
    });
  });

  describe("when the FEN contains an invalid full move count", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("0 1", "0 -1"))).toThrow();
    });
  });

  describe("when the FEN only contains a position", () => {
    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.split(" ")[0]!)).toThrow();
    });
  });

  describe("when the FEN contains an empty position", () => {

    it("returns an empty board", () => {
      expect(parseFENPosition(EMPTY_POSITION)).toIncludeSameMembers([]);
    });
  });

  describe("when the FEN contains the starting position", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(STARTING_POSITION)).toIncludeSameMembers(PARSED_STARTING_POSITION);
    });
  });

  describe("when the position is valid but another part of the FEN is not valid", () => {

    it("throws an error", () => {
      expect(() => parseFENPosition(STARTING_POSITION.replace("-", "kk"))).toThrow();
    });
  });

  describe("when the position is parsable but does not contain a valid chess position", () => {

    it("returns an array representing the position", () => {
      const position = STARTING_POSITION.replace("k", "q").replace("K", "Q");

      const expected = PARSED_STARTING_POSITION.map(parsedPiece => {
        if (parsedPiece.piece === BLACK_KING) {
          return { ...parsedPiece, piece: BLACK_QUEEN };
        }

        if (parsedPiece.piece === WHITE_KING) {
          return { ...parsedPiece, piece: WHITE_QUEEN };
        }

        return parsedPiece;
      });

      expect(parseFENPosition(position)).toIncludeSameMembers(expected);
    });
  });

  describe("when the FEN contains leading whitespace", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(`\n\t ${ STARTING_POSITION }`))
        .toIncludeSameMembers(PARSED_STARTING_POSITION);
    });
  });

  describe("when the FEN contains trailing whitespace", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(`${ STARTING_POSITION }\n\t `))
        .toIncludeSameMembers(PARSED_STARTING_POSITION);
    });
  });

  describe("when the FEN contains unnecessary numbers", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(STARTING_POSITION.replace(/8/g, "242")))
        .toIncludeSameMembers(PARSED_STARTING_POSITION);
    });
  });
});
