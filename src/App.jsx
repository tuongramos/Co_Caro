import './App.css';
import { useCaroGame } from './hooks/useCaroGame';
import Board from './components/Board';
import StatusPanel from './components/StatusPanel';
import ScoreBoard from './components/ScoreBoard';
import WinnerOverlay from './components/WinnerOverlay';
import rotateCcwIcon from './assets/rotate-ccw.png';

export default function App() {
  const {
    board,
    isXNext,
    winner,
    winningCellSet,
    isDraw,
    isGameOver,
    lastMove,
    moveCount,
    scores,
    handleCellClick,
    resetGame,
  } = useCaroGame();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="header__title">Cờ Caro</h1>
        <p className="header__subtitle">Gomoku • 19 × 19</p>
      </header>

      {/* Status */}
      <StatusPanel isXNext={isXNext} winner={winner} isDraw={isDraw} />

      {/* Score Board */}
      <ScoreBoard scores={scores} />

      {/* Board */}
      <Board
        board={board}
        winningCellSet={winningCellSet}
        lastMove={lastMove}
        isGameOver={isGameOver}
        onCellClick={handleCellClick}
      />

      {/* Controls */}
      <div className="controls">
        <button className="btn btn--primary" onClick={resetGame}>
          <span className="btn__icon"><img src={rotateCcwIcon} alt="Chơi lại" width="16" height="16" /></span>
          Chơi lại
        </button>
      </div>

      {/* Winner / Draw Overlay */}
      <WinnerOverlay
        winner={winner}
        isDraw={isDraw}
        onRestart={resetGame}
      />
    </div>
  );
}
