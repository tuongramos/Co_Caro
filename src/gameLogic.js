/**
 * Game logic module for Caro (Gomoku).
 * Contains pure functions for board initialization, win checking, and draw detection.
 */

const BOARD_SIZE = 19;
const WIN_COUNT = 5;

/**
 * Create an empty board (2D array of null values).
 * @returns {Array<Array<null>>} A 19x19 grid filled with null.
 */
export function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => null)
  );
}

/**
 * Count consecutive pieces in a specific direction from (row, col).
 * @param {Array<Array<string|null>>} board - The game board.
 * @param {number} row - Starting row.
 * @param {number} col - Starting column.
 * @param {number} dRow - Row direction delta (-1, 0, or 1).
 * @param {number} dCol - Column direction delta (-1, 0, or 1).
 * @param {string} player - 'X' or 'O'.
 * @returns {Array<[number, number]>} Array of [row, col] positions in this direction.
 */
function countDirection(board, row, col, dRow, dCol, player) {
  const positions = [];
  let r = row + dRow;
  let c = col + dCol;

  while (
    r >= 0 && r < BOARD_SIZE &&
    c >= 0 && c < BOARD_SIZE &&
    board[r][c] === player
  ) {
    positions.push([r, c]);
    r += dRow;
    c += dCol;
  }

  return positions;
}

/**
 * Check if the last move at (row, col) results in a win.
 * A win is exactly 5 in a row (not 6 or more — "overline" rule).
 *
 * Checks 4 axes: horizontal, vertical, and both diagonals.
 *
 * @param {Array<Array<string|null>>} board - The game board.
 * @param {number} row - Row of the last move.
 * @param {number} col - Column of the last move.
 * @returns {{ winner: string|null, winningCells: Array<[number, number]>|null }}
 */
export function checkWinner(board, row, col) {
  const player = board[row][col];
  if (!player) return { winner: null, winningCells: null };

  // 4 axes: [dRow, dCol] pairs representing both directions of each axis.
  const axes = [
    [[0, 1], [0, -1]],   // Horizontal
    [[1, 0], [-1, 0]],   // Vertical
    [[1, 1], [-1, -1]],  // Diagonal ↘↖
    [[1, -1], [-1, 1]],  // Diagonal ↙↗
  ];

  for (const [[dR1, dC1], [dR2, dC2]] of axes) {
    const forward = countDirection(board, row, col, dR1, dC1, player);
    const backward = countDirection(board, row, col, dR2, dC2, player);

    const totalCount = 1 + forward.length + backward.length;

    // Exactly 5 — overline (6+) does NOT count as a win.
    if (totalCount === WIN_COUNT) {
      const winningCells = [...backward.reverse(), [row, col], ...forward];
      return { winner: player, winningCells };
    }
  }

  return { winner: null, winningCells: null };
}

/**
 * Check if the game is a draw (all cells filled, no winner).
 * @param {Array<Array<string|null>>} board - The game board.
 * @returns {boolean} True if every cell is filled.
 */
export function checkDraw(board) {
  return board.every(row => row.every(cell => cell !== null));
}

export { BOARD_SIZE, WIN_COUNT };
