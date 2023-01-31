import { useMemo, useRef } from "react";
import { spring, TransitionMotion } from "react-motion";

import { Piece as PieceType, PieceComponent, Player, Square } from "../types";
import { minBy } from "../utilities/array";
import { parseFENPosition } from "../utilities/fen";
import { taxiCabDistance } from "../utilities/squares";
import { uniqueId } from "../utilities/unique-id";
import { Piece } from "./piece";

type PiecesProps = {
  fen: string,
  orientation: Player,
  pieceComponent: PieceComponent
}

type UnidentifiedPiece = { piece: PieceType, square: Square }
type IdentifiedPiece = UnidentifiedPiece & { key: string }
type PieceData = Record<Square, IdentifiedPiece>

/**
 * Returns the closest piece in the piece data. If no piece is closes, this function returns
 * undefined.
 * @param from The verbose piece whose closes piece we're searching for.
 * @param pieceData The piece data we should search through to find the closest piece.
 * @returns The closes piece, or undefined if there is no closest piece.
 */
function closestPiece(from: UnidentifiedPiece, pieceData: PieceData) {
  return minBy(Object.values(pieceData), (to) => {
    return from.piece === to.piece
      ? taxiCabDistance(from.square, to.square)
      : Number.POSITIVE_INFINITY;
  });
}

/**
 * In order for the animation algorithm to work, the library must be able to maintain continuity
 * between FEN changes. To enable that, whenever a piece is rendered, it's assigned a unique ID.
 * When the FEN changes, the previous configuration is compared against the current configuration,
 * and prior pieces are matched up to their existing IDs.
 *
 * @param fen The current FEN to be rendered.
 * @param previousData The piece data from the previous render.
 * @returns The updated data for the current FEN.
 */
function pieceChanges(fen: string, previousData: PieceData): PieceData {
  previousData = Object.assign({}, previousData);
  const data: PieceData = {} as PieceData;
  const mismatched: UnidentifiedPiece[] = [];

  // Start by going through each piece from the parsed FEN data. If the piece hasn't changed, then
  // add it to the new data. If the piece has changed, add it to appeared list.
  for (const { square, piece } of parseFENPosition(fen)) {
    if (previousData[square]?.piece === piece) {
      data[square] = previousData[square];
      delete previousData[square];
    }
    else {
      mismatched.push({ square, piece });
    }
  }

  // For the remaining mismatched pieces, try to find the _closest_ piece of the same type.
  for (const to of mismatched) {
    const from = closestPiece(to, previousData);

    // If there is a closes piece, then remove that piece from the previous data and add it to the
    // new data.
    if (from) {
      delete previousData[from.square];
      data[to.square] = { key: from.key, ...to };
    }

    // Otherwise, the piece has appeared and we can add it to the data with a new ID.
    else {
      data[to.square] = { ...to, key: uniqueId("wfu") };
    }
  }

  return data;
}

const SPRING_SETTINGS = { stiffness: 300, damping: 30 };
const STYLE = { opacity: spring(1, SPRING_SETTINGS) };

function willEnter() {
  return { opacity: 0 };
}

function willLeave() {
  return { opacity: spring(0, SPRING_SETTINGS) };
}

export function Pieces({ fen, orientation, pieceComponent }: PiecesProps) {

  // Keep track of the data from the previous render.
  const previousDataRef = useRef<PieceData>({} as PieceData);

  // When the FEN changes, update the pieces with their appropriate changes.
  const pieceData = useMemo(() => {
    previousDataRef.current = pieceChanges(fen, previousDataRef.current);
    return previousDataRef.current;
  }, [ fen ]);

  // Extract the pieces from the piece data.
  const pieces = Object.values(pieceData);

  // Render a transition motion that will properly animate pieces appearing and disappearing.
  return <TransitionMotion
    willEnter={ willEnter }
    willLeave={ willLeave }
    styles={
      pieces.map((renderPiece) => {
        return { key: renderPiece.key, style: STYLE, data: renderPiece };
      })
    }
  >
    {
      (items) => {
        return <>
          {
            items.map(({ key, style, data: renderPiece }) => {
              return <Piece
                key={ key }
                orientation={ orientation }
                pieceComponent={ pieceComponent }
                { ...renderPiece }
                { ...style }
              />;
            })
          }
        </>;
      }
    }
  </TransitionMotion>;
}
