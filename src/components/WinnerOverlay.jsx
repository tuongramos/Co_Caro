/**
 * Winner overlay modal shown when the game ends.
 */
export default function WinnerOverlay({ winner, isDraw, onRestart }) {
  if (!winner && !isDraw) return null;
  return (
    <div className="winner-overlay" onClick={onRestart}>
      <div className="winner-modal" onClick={(e) => e.stopPropagation()}>
        {winner ? (
          <>
            <div className="winner-modal__emoji">🎉</div>
            <h2 className="winner-modal__title">
              {winner === 'X' ? 'Đen (X)' : 'Đỏ (O)'} chiến thắng!
            </h2>
            <p className="winner-modal__subtitle">
              Chúc mừng! Người chơi {winner === 'X' ? 'Đen' : 'Đỏ'} đã tạo được 5 quân thẳng hàng.
            </p>
          </>
        ) : (
          <>
            <div className="winner-modal__emoji">🤝</div>
            <h2 className="winner-modal__title">Ván đấu Hòa!</h2>
            <p className="winner-modal__subtitle">
              Bàn cờ đã đầy mà chưa ai đạt 5 quân thẳng hàng.
            </p>
          </>
        )}
        <button
          className="btn btn--primary winner-modal__btn"
          onClick={onRestart}
        >
          <span className="btn__icon"><img src="src/assets/rotate-ccw.png" /></span>
          Chơi lại
        </button>
      </div>
    </div>
  );
}