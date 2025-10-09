import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function Notification({ message, type }) {
  const colors = {
    success: 'var(--matrix-lime)',
    error: 'var(--flame-red)',
    info: 'var(--neon-cyan)',
  };
  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
    info: faInfoCircle,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById(`notification-${message}`).style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.getElementById(`notification-${message}`)?.remove();
      }, 400);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      id={`notification-${message}`}
      className="notification fixed top-24 right-5 bg-gradient-to-br from-deep-black to-slate-gray text-white p-4 rounded-xl border-2 flex items-center gap-3 z-[10000] transition-transform duration-400"
      style={{ borderColor: colors[type], boxShadow: `0 8px 25px ${colors[type]}33`, transform: 'translateX(0)' }}
    >
      <FontAwesomeIcon icon={icons[type]} />
      <span>{message}</span>
    </div>
  );
}

export default Notification;