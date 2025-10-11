import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faDoorOpen, faPlusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Navbar({ showModal, showNotification }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const overlay = document.createElement('div');
    overlay.className = 'logout-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); z-index: 10000;
      display: flex; align-items: center; justify-content: center; opacity: 0;
      transition: opacity 0.3s ease;
    `;
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal-content bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl p-8 border-2 border-flame-red shadow-[0_20px_60px_rgba(255,69,0,0.3)] text-center max-w-md transform scale-80 transition-transform">
        <div class="modal-icon w-20 h-20 rounded-full bg-flame-red/20 flex items-center justify-center mx-auto mb-6 text-flame-red text-4xl">
          <i class="fas fa-sign-out-alt"></i>
        </div>
        <h3 class="text-text-primary mb-4 text-xl font-bold">Confirm Logout</h3>
        <p class="text-text-secondary mb-8">Are you sure you want to leave the battle arena? Your progress will be saved.</p>
        <div class="modal-actions flex gap-4 justify-center">
          <button class="cancel-btn px-6 py-3 border-2 border-text-muted bg-transparent text-text-secondary rounded-xl cursor-pointer font-space transition-all hover:bg-text-muted hover:text-void-black">Cancel</button>
          <button class="confirm-btn px-6 py-3 border-2 border-flame-red bg-flame-red text-white rounded-xl cursor-pointer font-space transition-all hover:shadow-[0_8px_25px_rgba(255,69,0,0.4)]">Logout</button>
        </div>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.opacity = '1';
      modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 100);

    modal.querySelector('.cancel-btn').addEventListener('click', () => {
      overlay.style.opacity = '0';
      setTimeout(() => document.body.removeChild(overlay), 300);
    });

    modal.querySelector('.confirm-btn').addEventListener('click', () => {
      showNotification('Logout successful! See you soon!', 'success');
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
        window.location.href = 'index.html';
      }, 1500);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild(overlay), 300);
      }
    });
  };

  return (
    <nav
      className="fixed top-0 w-full bg-deep-black/95 backdrop-blur-3xl border-b-2 border-[var(--gradient-dashboard)] z-[1000] py-5 animate-navSlide"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
        <div className="logo flex items-center text-3xl font-extrabold tracking-tight">
          <span className="logo-code bg-gradient-logo-code bg-clip-text text-transparent animate-logoCodeGlow">
            Kode
          </span>
          <span className="logo-versus bg-gradient-logo-versus bg-clip-text text-transparent animate-logoVersusGlow">
            Kshetra
          </span>
        </div>
        <div className="nav-actions flex gap-4">
          <button
  onClick={() => navigate('/leaderboard', { replace: true })}
  className="nav-btn leaderboard-btn flex items-center gap-2 px-4 py-3 rounded-xl bg-neon-cyan/10 text-neon-cyan border-2 border-neon-cyan font-semibold text-sm transition-all hover:bg-neon-cyan hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,245,255,0.4)]"
>
  <FontAwesomeIcon icon={faTrophy} />
  <span className="hidden sm:inline">Leaderboard</span>
</button>

          <button
            onClick={() => showModal('join-queue-modal')}
            className="nav-btn join-queue-btn flex items-center gap-2 px-4 py-3 rounded-xl bg-matrix-lime/10 text-matrix-lime border-2 border-matrix-lime font-semibold text-sm transition-all hover:bg-matrix-lime hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(50,205,50,0.4)]"
          >
            <FontAwesomeIcon icon={faDoorOpen} />
            <span className="hidden sm:inline">Join Queue</span>
          </button>
          <button
            onClick={() => showModal('join-room-modal')}
            className="nav-btn join-room-btn flex items-center gap-2 px-4 py-3 rounded-xl bg-matrix-lime/10 text-matrix-lime border-2 border-matrix-lime font-semibold text-sm transition-all hover:bg-matrix-lime hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(50,205,50,0.4)]"
          >
            <FontAwesomeIcon icon={faDoorOpen} />
            <span className="hidden sm:inline">Join Room</span>
          </button>
          <button
            onClick={() => showModal('create-room-modal')}
            className="nav-btn create-room-btn flex items-center gap-2 px-4 py-3 rounded-xl bg-golden-amber/10 text-golden-amber border-2 border-golden-amber font-semibold text-sm transition-all hover:bg-golden-amber hover:text-void-black hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,176,0,0.4)]"
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            <span className="hidden sm:inline">Create Room</span>
          </button>
          <button
            onClick={handleLogout}
            className="nav-btn logout-btn flex items-center gap-2 px-4 py-3 rounded-xl bg-flame-red/10 text-flame-red border-2 border-flame-red font-semibold text-sm transition-all hover:bg-flame-red hover:text-text-primary hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,69,0,0.4)]"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
