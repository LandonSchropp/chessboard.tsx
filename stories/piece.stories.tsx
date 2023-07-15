import { StoryObj } from "@storybook/react";
import { merge } from "lodash";

import { Piece } from "../src/components/piece";
import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  WHITE,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../src/constants";
import { SVGSquareDecorator } from "./decorators/svg-decorators";

export default {
  title: "Internal/Piece",
  component: Piece,
  decorators: [ SVGSquareDecorator ]
};

export const WhiteKing: StoryObj<typeof Piece> = {
  args: {
    piece: WHITE_KING,
    square: "a1",
    orientation: WHITE
  }
};

export const WhiteQueen: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: WHITE_QUEEN
  }
});

export const WhiteRook: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: WHITE_ROOK
  }
});

export const WhiteBishop: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: WHITE_BISHOP
  }
});

export const WhiteKnight: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: WHITE_KNIGHT
  }
});

export const WhitePawn: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: WHITE_PAWN
  }
});

export const BlackKing: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: BLACK_KING
  }
});

export const BlackQueen: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: BLACK_QUEEN
  }
});

export const BlackRook: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: BLACK_ROOK
  }
});

export const BlackBishop: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: BLACK_BISHOP
  }
});

export const BlackKnight: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: BLACK_KNIGHT
  }
});

export const BlackPawn: StoryObj<typeof Piece> = merge({}, WhiteKing, {
  args: {
    piece: BLACK_PAWN
  }
});
