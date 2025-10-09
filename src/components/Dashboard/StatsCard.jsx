import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faShieldAlt , faGamepad } from '@fortawesome/free-solid-svg-icons';

function StatsCard({ user, className }) {
  return (
    <div className={`dashboard-card stats-card bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl border-2 border-matrix-lime/30 backdrop-blur-3xl transition-all hover:-translate-y-1 hover:border-neon-cyan hover:shadow-[0_15px_40px_rgba(0,245,255,0.2)] p-6 relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-dashboard opacity-0 transition-opacity z-[1]"
        aria-hidden="true"
      ></div>
      <div className="card-header flex justify-between items-center mb-6 z-[2]">
        <h3 className="card-title flex items-center gap-2 text-xl font-bold text-text-primary">
          <FontAwesomeIcon icon={faChartBar} className="text-neon-cyan text-lg" />
          Battle Statistics
        </h3>
      </div>
      <div className="stats-grid flex flex-col gap-6 z-[2]">
        <div className="stat-item battles-stat flex items-center gap-4 p-4 bg-matrix-lime/10 rounded-xl border border-matrix-lime/20">
          <div className="stat-icon w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-stats text-text-primary">
            <FontAwesomeIcon icon={faShieldAlt } />
          </div>
          <div className="stat-content flex-1">
            <div className="stat-numbers flex items-center gap-2 mb-1">
              <span className="won text-xl font-extrabold text-matrix-lime font-jetbrains">{user.wins}</span>
              <span className="divider text-lg text-text-muted">/</span>
              <span className="lost text-xl font-extrabold text-flame-red font-jetbrains">{user.losses}</span>
            </div>
            <div className="stat-label text-sm text-text-muted mb-1">Won / Lost</div>
            <div className="win-rate text-xs text-matrix-lime font-semibold">
              {((user.wins / user.totalBattles) * 100).toFixed(1)}% Win Rate
            </div>
          </div>
        </div>
        <div className="stat-item total-battles flex items-center gap-4 p-4 bg-matrix-lime/10 rounded-xl border border-matrix-lime/20">
          <div className="stat-icon w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-stats text-text-primary">
            <FontAwesomeIcon icon={faGamepad} />
          </div>
          <div className="stat-content flex-1">
            <span className="stat-value text-2xl font-extrabold text-text-primary font-jetbrains">
              {user.totalBattles.toLocaleString()}
            </span>
            <div className="stat-label text-sm text-text-muted">Total Battles</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;