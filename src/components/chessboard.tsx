import classNames from "classnames";

import { SVG_BOARD_SIZE } from "../constants";
import {
  Arrow,
  ArrowComponent,
  Highlight,
  HighlightComponent,
  Marker,
  MarkerComponent,
  Piece,
  PieceComponent,
  Player,
  Square
} from "../types";
import { Arrows } from "./arrows";
import { CburnettPiece } from "./cburnette-piece";
import { Coordinates } from "./coordinates";
import { DotMarker } from "./dot-marker";
import { HighlightMarkers } from "./highlight-markers";
import { MixedArrow } from "./mixed-arrow";
import { Pieces } from "./pieces";
import { SquareHighlight } from "./square-highlight";
import { Squares } from "./squares";

/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Represents a modifier key that's held down by the user when adding an arrow or highlight.
 */
type Modifier = "alt" | "shift" | "control" | null

/**
 * @typedef ChessboardProps
 */
type ChessboardProps = {

  /** Any additional classes you'd like to add to the chessboard. */
  className?: string,

  /** The player the board should be oriented toward.  */
  orientation: Player

  /** The FEN to display on the chessboard. */
  fen: string,

  /** The arrows to render on the chessboard. */
  arrows?: Arrow[],

  /** The highlights to render on the chessboard. Highlights are rendered _below_ the pieces. */
  highlights?: Highlight[],

  /** The markers to render on the chessboard. Markers are rendered _above_ the pieces. */
  markers?: Marker[],

  /**
   * Called when the player completed a move, either by releasing a drag or by clicking on a square.
   * @param move An object represent the move.
   * @param move.from The square the piece is being moved from.
   * @param move.piece The piece being moved.
   * @returns Return true if you'd like to allow the move, and false if you'd like to cancel it.
   */
  onMoveStart?: (move: { from: Square, piece: Piece }) => boolean,

  /**
   * Called when the player completed a move, either by releasing a drag or by clicking on a square.
   * If you'd like to allow the move, you'll need to update the FEN for the chessboard.
   * @param move An object represent the move.
   * @param move.from The square the piece was moved from.
   * @param move.to The square the piece was moved to.
   * @param move.piece The piece that was moved.
   * @param move.promotion If the piece was a pawn that was promoted, this will be the piece the
   * pawn was promoted to.
   */
  onMoveDone?: (move: {
    from: Square,
    to: Square,
    piece: Piece,
    promotion: Piece | undefined
  }) => void,

  /**
   * Called when the player moves a pawn to the back rank.
   * @param promotion An object representing the promotion.
   * @param promotion.square The square the promotion occurs on.
   * @param promotion.piece The piece being promoted. This will always be a pawn.
   * @returns Return true if you'd like to allow promotion, and false if you'd like to prevent it.
   * If this function returns false, then the pawn will be moved instead.
   */
  onPromotionStart?: (promotion: { square: Square, piece: Piece }) => boolean,

  /**
   * Called when the player moves a pawn to the back rank. The `onMoveDone` callback will be called
   * after this, so unless you need some special promotion logic, you can likely exclude this
   * callback.
   * @param promotion An object representing the promotion.
   * @param promotion.square The square the promotion occurs on.
   * @param promotion.piece The piece that was promoted. This will always be a pawn.
   * @param promotion.promotion The piece the pawn was promoted to.
   */
  onPromotionDone?: (promotion: {
    square: Square,
    piece: Piece,
    promotion: Piece
  }) => void,

  /**
   * Called when a piece is selected.
   * @param selection An object representing the selection.
   * @param selection.square The square the selected piece occupies.
   * @param selection.piece The piece that was selected.
   * @returns Return true to allow the selection and false to now allow the section.
   */
  onSelect?: (selection: { square: Square, piece: Piece }) => boolean,

  /**
   * Called when a piece is deselected.
   * @param deselection An object representing the deselection.
   * @param deselection.square The square the deselected piece occupies.
   * @param deselection.piece The piece that was deselected.
   */
  onDeselect?: (deselection: { square: Square, piece: Piece }) => void,

  /**
   * Called when a square is highlighted. Since this library renders whatever is present in the
   * `highlights` property, it's up to the user of this library to consume this callback and add or
   * remove the highlight directly to the array.
   * @param highlight An object representing the highlight.
   * @param deselection.square The square the deselected piece occupies.
   * @param deselection.piece The piece that was deselected.
   */
  onHighlight?: (highlight: { square: Square, modifier: Modifier }) => void

  /**
   * Called when an arrow is added between two squares. Since this library renders whatever is
   * present in the `arrows` property, it's up to the user of this library to consume this callback
   * and add or remove the arrow directly to the array.
   * @param deselection An object representing the deselection.
   * @param deselection.square The square the deselected piece occupies.
   * @param deselection.piece The piece that was deselected.
   */
  onArrow?: (arrow: { from: Square, to: Square, modifier: Modifier }) => void,

  /**
   * The component used to render a piece. By default, this will use the piece set created by Colin
   * Burnette that's available under the CC BY-SA 3.0 license. However, you can override this to
   * render whatever chess piece you'd like!
   */
  pieceComponent?: PieceComponent,

  /**
   * The component used to render a highlight. Highlights always appear _below_ pieces. If this
   * component is not provided, a square highlight is used by default. However, it's easy to
   * override this and add your own highlights!
   */
  highlightComponent?: HighlightComponent,

  /**
   * The component used to render a marker. Markers always appear _above_ pieces. If this component
   * is not provided, a dot marker is used by default. However, it's easy to override this and add
   * your own markers!
   */
  markerComponent?: MarkerComponent,

  /**
   * The component used to render an arrow. Arrows always appear _above_ pieces. If this
   * component is not provided, the `MixedArrow` component is used, which renders an
   * `OrthagonalArrow` for kngiht moves and a `StraightArrow` for all other moves. If you'd prefer,
   * you can pass `StraightArrow` instead to always display straight arrows, or override this
   * component to add your own arrows!
   */
  arrowComponent?: ArrowComponent
}

/**
 * A clean, simple, highly-customizable Chessboard component.
 * @param {ChessboardProps} props
 */
export function Chessboard({
  className,
  orientation,
  fen,
  arrows = [],
  highlights = [],
  markers = [],
  onMoveStart = () => true,
  onMoveDone = () => {},
  onPromotionStart = () => true,
  onPromotionDone = () => {},
  onSelect = () => true,
  onDeselect = () => {},
  onHighlight = () => {},
  onArrow = () => {},
  pieceComponent = CburnettPiece,
  highlightComponent = SquareHighlight,
  markerComponent = DotMarker,
  arrowComponent = MixedArrow
}: ChessboardProps) {
  return <svg
    className={ classNames("chessboard", className) }
    viewBox={ `0 0 ${ SVG_BOARD_SIZE } ${ SVG_BOARD_SIZE }` }
  >
    <Squares orientation={ orientation } />
    <Coordinates orientation={ orientation } />

    <HighlightMarkers
      type="highlight"
      orientation={ orientation }
      highlightMarkers={ highlights }
      highlightMarkerComponent={ highlightComponent }
    />

    <Pieces
      orientation={ orientation }
      fen={ fen }
      pieceComponent={ pieceComponent }
    />

    <HighlightMarkers
      type="marker"
      orientation={ orientation }
      highlightMarkers={ markers }
      highlightMarkerComponent={ markerComponent }
    />

    <Arrows
      orientation={ orientation }
      arrows={ arrows }
      arrowComponent={ arrowComponent }
    />
  </svg>;
}
