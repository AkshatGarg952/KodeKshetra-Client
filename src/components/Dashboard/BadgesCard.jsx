import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';


function BadgesCard({ badgesData, showModal, className, badgesCount }) {
  const MAX_VISIBLE = 11; // show up to 11 badges normally


  // Prepare the badges to display
  const displayedBadges = badgesData.slice(0, MAX_VISIBLE);


  // Determine if we need the "note" card
  const hasMore = badgesData.length > MAX_VISIBLE;


  // Fill empty slots to make 12 total cards if less than 12
  while (displayedBadges.length < 12) {
    displayedBadges.push({
      id: `empty-${displayedBadges.length}`,
      title: '',
      image: '',
      description: '',
      quantity: 0,
      empty: true,
    });
  }


  // If there are more badges, replace the 12th card with a note
  if (hasMore) {
    displayedBadges[11] = {
      id: 'note-card',
      note: 'Click on the button below to see other badges',
    };
  }


  return (
    <div
      className={`dashboard-card badges-main-card bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl border-2 border-electric-purple/30 backdrop-blur-3xl transition-all hover:-translate-y-1 hover:border-neon-cyan hover:shadow-[0_15px_40px_rgba(0,245,255,0.2)] p-6 relative overflow-hidden flex flex-col ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-dashboard opacity-0 transition-opacity z-[1]"
        aria-hidden="true"
      ></div>


      {/* Header */}
      <div className="card-header flex justify-between items-center mb-6 z-[2]">
        <h3 className="card-title flex items-center gap-2 text-xl font-bold text-text-primary">
          <FontAwesomeIcon icon={faAward} className="text-neon-cyan text-lg" />
          Achievement Gallery
        </h3>
        <div className="badges-count bg-gradient-dashboard px-3 py-1 rounded-xl font-bold text-xs text-text-primary">
          <span>{badgesCount} Earned</span>
        </div>
      </div>


      {/* Gallery: Fixed 4x3 */}
      <div
        className="badges-main-gallery grid grid-cols-4 grid-rows-3 gap-6 justify-center z-[2] flex-1 mb-6"
        id="badges-main-gallery"
      >
        {displayedBadges.map((badge, index) => (
          <div
            key={badge.id}
            className={`badge-main-item bg-slate-gray/50 rounded-2xl border-2 border-electric-purple/30 text-center transition-all hover:border-electric-purple hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(139,0,255,0.3)] p-4 relative ${
              badge.empty ? 'opacity-30 pointer-events-none' : ''
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            title={badge.description || ''}
          >
            {/* Quantity Badge - Top Right */}
            {badge.quantity && badge.quantity > 0 && !badge.note && (
              <div className="absolute top-2 right-2 bg-neon-cyan/20 border border-neon-cyan px-2 py-0.5 rounded-md text-neon-cyan text-xs font-semibold">
                X {badge.quantity}
              </div>
            )}

            {/* Badge Image */}
            {badge.image && (
              <img
                src={badge.image}
                alt={badge.title}
                className="mx-auto mb-3 w-20 h-20 object-contain"
              />
            )}


            {/* Badge Title */}
            {badge.title && (
              <h4 className="badge-main-title font-semibold text-sm text-text-primary">
                {badge.title}
              </h4>
            )}


            {/* Note for 12th card */}
            {badge.note && (
              <p className="text-xs text-text-primary font-medium mt-8">
                {badge.note}
              </p>
            )}
          </div>
        ))}
      </div>


      {/* Show All Button (outside the gallery) */}
      <button
        className="show-all-badges-btn bg-gradient-dashboard text-text-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 justify-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(139,0,255,0.4)] z-[2]"
        onClick={() => showModal('badges-modal')}
      >
        Show All Badges
      </button>
    </div>
  );
}

export default BadgesCard;
