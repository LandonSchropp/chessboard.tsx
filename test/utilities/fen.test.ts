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
import { times } from "../../src/utilities/array";
import { parseFENPosition } from "../../src/utilities/fen";

const EMPTY_RANK = times(8, () => null);
const EMPTY_BOARD = times(8, () => EMPTY_RANK);

const PARSED_STARTING_POSITION = [
  [
    BLACK_ROOK,
    BLACK_KNIGHT,
    BLACK_BISHOP,
    BLACK_QUEEN,
    BLACK_KING,
    BLACK_BISHOP,
    BLACK_KNIGHT,
    BLACK_ROOK
  ],
  times(8, () => BLACK_PAWN),
  ...times(4, () => EMPTY_RANK),
  times(8, () => WHITE_PAWN),
  [
    WHITE_ROOK,
    WHITE_KNIGHT,
    WHITE_BISHOP,
    WHITE_QUEEN,
    WHITE_KING,
    WHITE_BISHOP,
    WHITE_KNIGHT,
    WHITE_ROOK
  ]
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
      expect(parseFENPosition(EMPTY_POSITION)).toEqual(EMPTY_BOARD);
    });
  });

  describe("when the FEN contains the starting position", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(STARTING_POSITION)).toEqual(PARSED_STARTING_POSITION);
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

      expect(parseFENPosition(position)).toEqual([
        [
          BLACK_ROOK,
          BLACK_KNIGHT,
          BLACK_BISHOP,
          BLACK_QUEEN,
          BLACK_QUEEN,
          BLACK_BISHOP,
          BLACK_KNIGHT,
          BLACK_ROOK
        ],
        times(8, () => BLACK_PAWN),
        ...times(4, () => EMPTY_RANK),
        times(8, () => WHITE_PAWN),
        [
          WHITE_ROOK,
          WHITE_KNIGHT,
          WHITE_BISHOP,
          WHITE_QUEEN,
          WHITE_QUEEN,
          WHITE_BISHOP,
          WHITE_KNIGHT,
          WHITE_ROOK
        ]
      ]);
    });
  });

  describe("when the FEN contains leading whitespace", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(`\n\t ${ STARTING_POSITION }`)).toEqual(PARSED_STARTING_POSITION);
    });
  });

  describe("when the FEN contains trailing whitespace", () => {

    it("returns an array representing the position", () => {
      expect(parseFENPosition(`${ STARTING_POSITION }\n\t `)).toEqual(PARSED_STARTING_POSITION);
    });
  });
});
