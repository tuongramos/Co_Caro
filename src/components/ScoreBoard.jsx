/**
 * ScoreBoard: tracks wins for X and O across multiple games.
 */
export default function ScoreBoard({ scores }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__card">
        <span className="scoreboard__label scoreboard__label--x">X (Đen)</span>
        <span className="scoreboard__value">{scores.X}</span>
      </div>
      <span className="scoreboard__separator">—</span>
      <div className="scoreboard__card">
        <span className="scoreboard__label scoreboard__label--o">O (Đỏ)</span>
        <span className="scoreboard__value">{scores.O}</span>
      </div>
    </div>
  );
}
