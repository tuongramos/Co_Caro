/**
 * Status Panel: displays whose turn it is, or the winner / draw message.
 */
export default function StatusPanel({ isXNext, winner, isDraw }) {
  if (winner) {
    const label = winner === 'X' ? 'Đen (X)' : 'Đỏ (O)';
    return (
      <div className="status-panel status-panel--winner">
        <div className="status-panel__indicator status-panel__indicator--trophy">🏆</div>
        <span className="status-panel__text">
          Người chơi{' '}
          <span className={`status-panel__highlight--${winner.toLowerCase()}`}>
            {label}
          </span>{' '}
          chiến thắng!
        </span>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="status-panel status-panel--draw">
        <div className="status-panel__indicator status-panel__indicator--draw-icon">🤝</div>
        <span className="status-panel__text">Ván đấu Hòa!</span>
      </div>
    );
  }

  const current = isXNext ? 'X' : 'O';
  const label = isXNext ? 'Đen' : 'Đỏ';

  return (
    <div className="status-panel">
      <div
        className={`status-panel__indicator status-panel__indicator--${current.toLowerCase()}`}
      >
        {current}
      </div>
      <span className="status-panel__text">
        Đang đến lượt:{' '}
        <span className={`status-panel__highlight--${current.toLowerCase()}`}>
          {current} ({label})
        </span>
      </span>
    </div>
  );
}
