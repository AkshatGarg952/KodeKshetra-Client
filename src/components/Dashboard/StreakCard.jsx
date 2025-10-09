import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved, faFire, faTrophy, faCrown, faMedal } from '@fortawesome/free-solid-svg-icons';

function StreakCard({ user, className }) {
  return (
    <div className={`dashboard-card streak-card bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl border-2 border-golden-amber/30 backdrop-blur-3xl transition-all hover:-translate-y-1 hover:border-neon-cyan hover:shadow-[0_15px_40px_rgba(0,245,255,0.2)] p-6 relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-gradient-dashboard opacity-0 transition-opacity z-[1]"
        aria-hidden="true"
      ></div>
      <div className="card-header flex justify-between items-center mb-6 z-[2]">
        <h3 className="card-title flex items-center gap-2 text-xl font-bold text-text-primary">
          <FontAwesomeIcon icon={faFireFlameCurved} className="text-neon-cyan text-lg" />
          Streak Records
        </h3>
      </div>
      <div className="streak-grid grid grid-cols-1 sm:grid-cols-2 gap-4 z-[2]">
        {[
          { icon: faFire, value: user.currentStreak, label: 'Current Streak' },
          { icon: faTrophy, value: user.maxStreak, label: 'Max Streak' },
          { icon: faCrown, value: user.currentWinStreak, label: 'Current Win Streak' },
          { icon: faMedal, value: user.maxWinStreak, label: 'Max Win Streak' },
        ].map((streak, index) => (
          <div
            key={index}
            className="streak-item flex items-center gap-4 p-4 bg-golden-amber/10 rounded-xl border border-golden-amber/20 transition-all hover:bg-golden-amber/20 hover:-translate-y-0.5"
          >
            <div className="streak-icon w-10 h-10 rounded-lg flex items-center justify-center text-lg text-golden-amber bg-golden-amber/20">
              <FontAwesomeIcon icon={streak.icon} />
            </div>
            <div className="streak-info flex flex-col">
              <span className="streak-value text-xl font-extrabold text-text-primary font-jetbrains">{streak.value}</span>
              <span className="streak-label text-xs text-text-muted">{streak.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakCard;