import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function BadgesModal({ activeModal, hideModal, badgesData }) {
  return (
    <div
      className={`modal-overlay fixed inset-0 bg-black/80 backdrop-blur-lg z-[10000] flex items-center justify-center transition-all duration-300 ${
        activeModal === 'badges-modal' ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) =>
        e.target.classList.contains('modal-overlay') && hideModal('badges-modal')
      }
    >
      <div
        className="modal-container badges-modal-container bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl border-2 border-neon-cyan backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,245,255,0.3)] max-w-4xl w-[90%] max-h-[80vh] transition-transform duration-300"
        style={{ transform: activeModal === 'badges-modal' ? 'scale(1)' : 'scale(0.8)' }}
      >
        {/* Header */}
        <div className="modal-header flex justify-between items-center p-6 border-b border-neon-cyan/20">
          <h3 className="text-xl font-bold text-text-primary">Achievement Gallery</h3>
          <button
            className="close-modal w-10 h-10 rounded-full bg-flame-red/20 text-flame-red flex items-center justify-center transition-all hover:bg-flame-red hover:text-text-primary hover:scale-110"
            onClick={() => hideModal('badges-modal')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>


        {/* Content */}
        <div className="modal-content p-6">
          <div className="badges-gallery grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 max-h-[60vh] overflow-y-auto pr-2">
            {badgesData.map((badge, index) => (
              <div
                key={badge.id}
                className="badge-gallery-item bg-slate-gray/50 rounded-2xl p-6 border-2 border-electric-purple/30 text-center transition-all hover:border-electric-purple hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(139,0,255,0.3)] relative"
                style={{ animationDelay: `${index * 0.1}s` }}
                title={badge.description}
              >
                {/* Quantity Badge - Top Right */}
                {badge.quantity && badge.quantity > 0 && (
                  <div className="absolute top-3 right-3 bg-neon-cyan/20 border border-neon-cyan px-2 py-0.5 rounded-md text-neon-cyan text-xs font-semibold">
                    X {badge.quantity}
                  </div>
                )}

                {/* Badge Image */}
                <img
                  src={badge.image}
                  alt={badge.title}
                  className="w-24 h-24 object-contain mx-auto mb-4"
                />


                {/* Badge Title */}
                <h4 className="badge-gallery-title text-lg font-bold text-text-primary">
                  {badge.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default BadgesModal;
