import { useState, useCallback, useMemo } from 'react';
import { createEmptyBoard, checkWinner, checkDraw, BOARD_SIZE } from '../gameLogic';

/**
 * Custom hook encapsulating all Caro game state and actions.
 * @returns {object} Game state and handler functions.
 */
export function useCaroGame() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  /** Whether the game has ended (win or draw). */
  const isGameOver = winner !== null || isDraw;

  /**
   * Handle a cell click at (row, col).
   * Places the current player's piece, checks win/draw, and switches turns.
   */
  const handleCellClick = useCallback((row, col) => {
    // Guard: ignore clicks on filled cells or after game is over.
    if (board[row][col] !== null || isGameOver) return;

    const currentPlayer = isXNext ? 'X' : 'O';

    // Create new board with the move applied.
    const newBoard = board.map((r, ri) =>
      r.map((cell, ci) => (ri === row && ci === col ? currentPlayer : cell))
    );

    setBoard(newBoard);
    setLastMove([row, col]);
    setMoveCount(prev => prev + 1);

    // Check for winner.
    const result = checkWinner(newBoard, row, col);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCells(result.winningCells);
      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1,
      }));
      return;
    }

    // Check for draw.
    if (checkDraw(newBoard)) {
      setIsDraw(true);
      return;
    }

    // Switch turn.
    setIsXNext(!isXNext);
  }, [board, isXNext, isGameOver]);

  /**
   * Reset the board for a new game.
   * Preserves scores across games.
   */
  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setIsXNext(true);
    setWinner(null);
    setWinningCells(null);
    setIsDraw(false);
    setLastMove(null);
    setMoveCount(0);
  }, []);

  /**
   * Set of winning cell keys for O(1) lookup in rendering.
   */
  const winningCellSet = useMemo(() => {
    if (!winningCells) return new Set();
    return new Set(winningCells.map(([r, c]) => `${r}-${c}`));
  }, [winningCells]);

  return {
    board,
    isXNext,
    winner,
    winningCells,
    winningCellSet,
    isDraw,
    isGameOver,
    lastMove,
    moveCount,
    scores,
    handleCellClick,
    resetGame,
    BOARD_SIZE,
  };
}
