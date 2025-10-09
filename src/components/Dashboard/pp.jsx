import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faFire } from '@fortawesome/free-solid-svg-icons';

function ProfileHeader({ user, heatmapData }) {
  return (
    <div className="profile-header grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 mb-12 bg-gradient-to-br from-deep-black to-slate-gray rounded-3xl p-8 border-2 border-electric-purple/30 backdrop-blur-3xl shadow-[0_20px_60px_rgba(139,0,255,0.2)] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(0,245,255,0.08)_100%),linear-gradient(45deg,transparent_98%,rgba(139,0,255,0.06)_100%)] bg-[length:120px_120px,80px_80px] animate-profileMove z-[1]"
        aria-hidden="true"
      ></div>

      {/* Avatar + Rank */}
      <div className="profile-avatar z-[2] flex justify-center">
        <div className="avatar-container flex flex-col items-center gap-4">
          <div className="avatar-img w-32 h-32 rounded-full bg-gradient-profile flex items-center justify-center text-4xl font-extrabold text-text-primary border-4 border-golden-amber/50 animate-avatarPulse overflow-hidden">
            <img
              src={user.avatar}
              alt={`${user.username}'s avatar`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rank-badge bg-gradient-fire px-4 py-2 rounded-2xl flex items-center gap-2 font-bold text-sm text-text-primary shadow-[0_4px_15px_rgba(255,69,0,0.3)] animate-badgeFloat">
            <FontAwesomeIcon icon={faCrown} />
            <span>Master</span>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="profile-info z-[2] text-center lg:text-left">
        <h1 className="username text-4xl font-extrabold bg-gradient-dashboard bg-clip-text text-transparent animate-usernamePulse">
          {user.username}
        </h1>
        <p className="user-title text-xl text-text-secondary font-medium mb-6">
          Competitive Programming Master
        </p>
        <div className="quick-stats flex flex-col md:flex-row gap-4 md:gap-8 justify-center lg:justify-start">
          <div className="quick-stat flex flex-col items-center gap-1">
            <span className="stat-value text-2xl font-extrabold font-jetbrains">
              {user.totalBattles.toLocaleString()}
            </span>
            <span className="stat-label text-sm text-text-muted uppercase tracking-wide">
              Total Battles
            </span>
          </div>
          <div className="quick-stat flex flex-col items-center gap-1">
            <span className="stat-value text-2xl font-extrabold font-jetbrains">
              {user.wins.toLocaleString()}
            </span>
            <span className="stat-label text-sm text-text-muted uppercase tracking-wide">
              Victories
            </span>
          </div>
          <div className="quick-stat flex flex-col items-center gap-1">
            <span className="stat-value text-2xl font-extrabold font-jetbrains">
              {user.badgesCount}
            </span>
            <span className="stat-label text-sm text-text-muted uppercase tracking-wide">
              Badges Earned
            </span>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="profile-heatmap z-[2] min-w-0 lg:min-w-[400px] mx-auto lg:mx-0">
        <div className="heatmap-header flex justify-between items-center mb-4">
          <h3 className="heatmap-title flex items-center gap-2 text-lg font-bold text-text-primary">
            <FontAwesomeIcon icon={faFire} className="text-neon-cyan text-base" />
            Last 90 Days Activity
          </h3>
          <div className="streak-indicator bg-gradient-fire px-3 py-1 rounded-xl font-bold text-xs text-text-primary animate-streakPulse">
            <span>{user.currentStreak} Day Streak</span>
          </div>
        </div>

        <div className="compact-heatmap-container max-w-[380px] mx-auto">
          <div className="compact-heatmap-grid grid grid-cols-[repeat(18,1fr)] gap-0.5 p-2 bg-slate-gray/10 rounded-xl border border-neon-cyan/20">
            {heatmapData && heatmapData.length > 0 ? (
              heatmapData.map((data, index) => (
                <div
                  key={index}
                  className={`heatmap-cell w-4 h-4 rounded cursor-pointer transition-all hover:scale-125 hover:shadow-[0_0_20px_currentColor] ${
                    data.battles === 0
                      ? 'bg-dark-gray'
                      : `bg-neon-cyan/${data.battles * 20} shadow-[0_0_${
                          8 + data.battles * 2
                        }px_rgba(0,245,255,0.${data.battles * 2})]`
                  }`}
                  data-level={data.battles}
                  title={`${new Date(data.date).toDateString()}: ${data.battles} battles`}
                ></div>
                

              ))
            ) : (
              // Show placeholder 90-day grid
              Array.from({ length: 90 }).map((_, index) => (
                <div
                  key={index}
                  className="heatmap-cell w-4 h-4 rounded bg-dark-gray opacity-40"
                ></div>
              ))
            )}
          </div>

          {/* Legend */}
          <div className="heatmap-legend flex items-center gap-2 text-xs text-text-muted justify-center mt-4">
            <span>Less</span>
            <div className="legend-scale flex gap-0.5">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`legend-item w-2.5 h-2.5 rounded-sm ${
                    level === 0 ? 'bg-dark-gray' : `bg-neon-cyan/${level * 20}`
                  }`}
                  data-level={level}
                ></div>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
