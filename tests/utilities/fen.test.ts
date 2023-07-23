import {
  BLACK,
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  EMPTY_POSITION,
  STARTING_POSITION,
  WHITE,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../../src/constants";
import { parseFENPosition, pieceAtSquare, playerTurn } from "../../src/utilities/fen";

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

describe("pieceAtSquare", () => {
  describe("when the FEN is empty", () => {
    it("returns null", () => {
      expect(pieceAtSquare(EMPTY_POSITION, "a1")).toEqual(null);
    });
  });

  describe("when the FEN does not contain a piece on the provided square", () => {
    it("returns null", () => {
      expect(pieceAtSquare(STARTING_POSITION, "e4")).toEqual(null);
    });
  });

  describe("when the FEN contains a piece on the provided square", () => {
    it("returns the piece", () => {
      expect(pieceAtSquare(STARTING_POSITION, "e2")).toEqual(WHITE_PAWN);
    });
  });
});

describe("playerTurn", () => {
  describe("when the FEN is the starting position", () => {
    it("returns WHITE", () => {
      expect(playerTurn(STARTING_POSITION)).toEqual(WHITE);
    });
  });

  describe("when it's black's turn in the FEN", () => {
    it("returns BLACK", () => {
      const fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
      expect(playerTurn(fen)).toEqual(BLACK);
    });
  });

  describe("when it's white's turn in the FEN", () => {
    it("returns BLACK", () => {
      const fen = "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2";
      expect(playerTurn(fen)).toEqual(WHITE);
    });
  });
});
