import { memo } from 'react';

/**
 * A single cell on the Caro board.
 * Memoized to prevent unnecessary re-renders on unaffected cells.
 */
const Cell = memo(function Cell({
  value,
  row,
  col,
  isWinning,
  isLastMove,
  isDisabled,
  onClick,
}) {
  const classNames = [
    'cell',
    value ? 'cell--filled' : '',
    isWinning ? 'cell--winning' : '',
    isLastMove ? 'cell--last-move' : '',
    isDisabled ? 'cell--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      onClick={() => onClick(row, col)}
      role="button"
      aria-label={`Ô ${row + 1}-${col + 1}${value ? `, ${value}` : ', trống'}`}
    >
      {value && (
        <span className={`piece piece--${value.toLowerCase()}`}>
          {value}
        </span>
      )}
    </div>
  );
});

export default Cell;
