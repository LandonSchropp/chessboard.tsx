import { useArrowReducer } from "../hooks/use-arrow-reducer";
import { useHighlightReducer } from "../hooks/use-highlight-reducer";
import { Chessboard, ChessboardProps } from "./chessboard";

type SimplifiedChessboardProps = Omit<ChessboardProps, "onHighlight" | "onArrow">

/**
 * A simplified chessboard component that contains sane defaults for user interactions. If you just
 * want to drop in a chessboard component with features like highlights and arrows, and you don't
 * want to worry about anything else, this is probably the component you want. If you want to dive
 * deeper into the details, you may want the {@link Chessboard} component instead.
 */
export function SimplifiedChessboard({
  highlights: highlightsProp,
  arrows: arrowsProp,
  ...props
}: SimplifiedChessboardProps) {
  const [ highlights, handleHighlight ] = useHighlightReducer();
  const [ arrows, handleArrow ] = useArrowReducer();

  return <Chessboard
    onHighlight={ handleHighlight }
    onArrow={ handleArrow }
    highlights={ [ ...highlightsProp ?? [], ...highlights ] }
    arrows={ [ ...arrowsProp ?? [], ...arrows ] }
    { ...props }
  />;
}
