import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faCircleNotch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation, replace } from 'react-router-dom';
import { socket } from "./components/socket.js";
import "./index.css";

const WaitingPage1 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, battle } = location.state || {};
  const { mode, topic } = battle || {}
  const userId = sessionStorage.getItem("userId")

  useEffect(() => {
    document.querySelector('.main-container')?.classList.add('animate-fadeIn');
    socket.emit("joinBattleRoom", {
      battle,
      userId,
      roomId
    });

    socket.on("battleStart", ({ question, battleId }) => {
      console.log("Battle started with question:", question);
      navigate("/battlepage", {
        state: {
          battle: { mode, topic, question, battleId },
          roomId,
        },
        replace: true
      });
    });

    return () => {
      socket.off("battleStart");
    };
  }, [navigate]);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to leave the room?')) {
      alert('Left the Room!');
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter flex flex-col overflow-hidden">
      {/* Your existing JSX content remains the same */}
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 md:p-8 bg-black/95 backdrop-blur-xl border-b-2 border-gradient-fire shadow-lg h-[70px] relative animate-neon-pulse">
        <div className="relative flex items-center">
          <span className="text-2xl md:text-[26px] font-extrabold text-gradient-void uppercase tracking-wider z-10">
            KodeKshetra
          </span>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] gradient-void rounded-full opacity-20 blur-xl z-0 animate-logo-glow"></div>
        </div>
        <div className="flex gap-6 md:gap-8">
          <a href="#home" className="text-gray-400 text-base md:text-lg font-semibold hover:text-cyan-400 hover:text-shadow-cyan transition-colors">
            Home
          </a>
          <a href="#profile" className="text-gray-400 text-base md:text-lg font-semibold hover:text-cyan-400 hover:text-shadow-cyan transition-colors">
            Profile
          </a>
          <a href="#logout" className="text-gray-400 text-base md:text-lg font-semibold hover:text-cyan-400 hover:text-shadow-cyan transition-colors">
            Logout
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-container flex-1 flex justify-center items-center p-4 md:p-8 bg-radial-gradients">
        <div className="bg-gray-900/90 backdrop-blur-xl border-2 border-blue-400 rounded-2xl p-4 md:p-8 max-w-xl w-full text-center shadow-2xl animate-fadeIn">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient-cyber mb-6 text-shadow-blue">
            Room Creation in Process
          </h1>
          <div className="text-4xl md:text-5xl text-green-400 mb-6 animate-spin animate-neon-flicker">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
          <div className="text-base md:text-lg text-gray-400 mb-8 font-mono">
            Waiting for the opponent to join the Room...
          </div>
          <div className="bg-black/80 border-2 border-pink-600 rounded-xl p-5 mb-8 shadow-glow-pink">
            <div className="flex items-center gap-3 text-base md:text-lg text-white mb-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-green-400 text-shadow-green" />
              <span>You</span>
            </div>
            <div className="flex items-center gap-3 text-base md:text-lg text-white">
              <FontAwesomeIcon icon={faCircleNotch} className="text-xl text-gray-500 animate-pulse" />
              <span>Opponent (Waiting...)</span>
            </div>
          </div>
          <button
            className="cancel-btn relative flex items-center gap-2 bg-gradient-fire text-black py-3 px-6 md:px-7 rounded-xl text-sm md:text-base font-bold uppercase tracking-wide border-2 border-pink-600 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            onClick={handleCancel}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
            Leave Room
            <div className="btn-glow rounded-xl"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage1;
