import { memo } from 'react';
import Cell from './Cell';

/**
 * The Caro game board component.
 * Renders the 19x19 grid of Cell components.
 */
const Board = memo(function Board({
  board,
  winningCellSet,
  lastMove,
  isGameOver,
  onCellClick,
}) {
  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            return (
              <Cell
                key={key}
                value={cell}
                row={rowIndex}
                col={colIndex}
                isWinning={winningCellSet.has(key)}
                isLastMove={
                  lastMove !== null &&
                  lastMove[0] === rowIndex &&
                  lastMove[1] === colIndex
                }
                isDisabled={isGameOver}
                onClick={onCellClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
});

export default Board;
