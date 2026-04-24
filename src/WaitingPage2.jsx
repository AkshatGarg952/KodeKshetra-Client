import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faCircleNotch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { establishSocketConnection } from "./components/socket.js";
import "./index.css";

const WaitingPage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasJoinedQueue = useRef(false);
  const socketRef = useRef(null);

  const { mode, topic, flowType } = location.state || {};
  const userId = sessionStorage.getItem("userId");
  const isAIBattle = flowType === 'ai';

  useEffect(() => {
    document.querySelector('.main-container')?.classList.add('animate-fadeIn');

    if (!userId || !mode || !topic) {
      navigate("/dashboard", { replace: true });
      return;
    }

    const activeSocket = establishSocketConnection();
    if (!activeSocket) {
      alert("Unable to connect to matchmaking right now. Please log in again.");
      navigate("/dashboard", { replace: true });
      return;
    }
    socketRef.current = activeSocket;

    const handleBattleStart = ({
      question,
      battleId,
      mode: battleMode,
      topic: battleTopic,
      battleType,
      opponent,
      battleEndsAt,
      battleStartedAt,
      battleDurationSeconds,
      roomId
    }) => {
      navigate("/battlepage", {
        state: {
          battle: {
            topic: battleTopic || topic,
            mode: battleMode || mode,
            question,
            battleId,
            battleType,
            opponent,
            battleEndsAt,
            battleStartedAt,
            battleDurationSeconds,
          },
          roomId: roomId || null,
        },
        replace: true
      });
    };

    const handleCancelMatchmakingResponse = ({ success, message }) => {
      if (success) {
        navigate("/dashboard", { replace: true });
      } else {
        alert(message);
      }
    };

    const handleMatchmakingError = ({ message }) => {
      alert(message || "Unable to join matchmaking right now.");
      navigate("/dashboard", { replace: true });
    };

    const handleConnectError = () => {
      alert("Matchmaking connection dropped. Please try joining queue again.");
      navigate("/dashboard", { replace: true });
    };

    activeSocket.on("battleStart", handleBattleStart);
    activeSocket.on("cancelMatchmakingResponse", handleCancelMatchmakingResponse);
    activeSocket.on("matchmakingError", handleMatchmakingError);
    activeSocket.on("connect_error", handleConnectError);

    let aiSafetyTimeoutId = null;

    let onConnectJoin = null;
    if (!hasJoinedQueue.current) {
      const emitJoinQueue = () => {
        if (isAIBattle) {
          activeSocket.emit("startAIBattle", {
            userId,
            mode,
            topic
          });
        } else {
          activeSocket.emit("joinQueue", { userId, mode, topic });
        }
        hasJoinedQueue.current = true;
      };

      if (activeSocket.connected) {
        emitJoinQueue();
      } else {
        onConnectJoin = emitJoinQueue;
        activeSocket.once("connect", onConnectJoin);
      }

      if (isAIBattle) {
        aiSafetyTimeoutId = setTimeout(() => {
          alert("AI battle setup is taking too long. Please try again after confirming the backend services are running.");
          navigate("/dashboard", { replace: true });
        }, 20000);
      }
    }

    return () => {
      activeSocket.off("battleStart", handleBattleStart);
      activeSocket.off("cancelMatchmakingResponse", handleCancelMatchmakingResponse);
      activeSocket.off("matchmakingError", handleMatchmakingError);
      activeSocket.off("connect_error", handleConnectError);
      if (onConnectJoin) {
        activeSocket.off("connect", onConnectJoin);
      }
      if (aiSafetyTimeoutId) {
        clearTimeout(aiSafetyTimeoutId);
      }
    };
  }, [navigate, userId, mode, topic, isAIBattle]);

  const handleCancel = () => {
    if (isAIBattle) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (window.confirm('Are you sure you want to cancel matchmaking?')) {
      socketRef.current?.emit("cancelMatchmaking", { userId, mode, topic });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter flex flex-col overflow-hidden">
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
            {isAIBattle ? 'Preparing AI Battle' : 'Matchmaking is in Progress'}
          </h1>
          <div className="text-4xl md:text-5xl text-green-400 mb-6 animate-spin animate-neon-flicker">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
          <div className="text-base md:text-lg text-gray-400 mb-8 font-mono">
            {isAIBattle
              ? 'HiddenForces is preparing your AI opponent and validating its solve attempt...'
              : 'Waiting a suitable opponent for you...'}
          </div>
          <div className="bg-black/80 border-2 border-pink-600 rounded-xl p-5 mb-8 shadow-glow-pink">
            <div className="flex items-center gap-3 text-base md:text-lg text-white mb-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-green-400 text-shadow-green" />
              <span>You</span>
            </div>
            <div className="flex items-center gap-3 text-base md:text-lg text-white">
              <FontAwesomeIcon icon={faCircleNotch} className="text-xl text-gray-500 animate-pulse" />
              <span>{isAIBattle ? 'AI Opponent (Solving...)' : 'Opponent (Searching...)'}</span>
            </div>
          </div>
          <button
            className="cancel-btn relative flex items-center gap-2 bg-gradient-fire text-black py-3 px-6 md:px-7 rounded-xl text-sm md:text-base font-bold uppercase tracking-wide border-2 border-pink-600 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            onClick={handleCancel}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
            {isAIBattle ? 'Back to Dashboard' : 'Cancel Matchmaking'}
            <div className="btn-glow rounded-xl"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage2;
