import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditorPanel from "./components/BattlePage/EditorPanel";
import ErrorFormatter from "./components/BattlePage/ErrorFormatter";
import Navbar from "./components/BattlePage/Navbar";
import Notification from "./components/BattlePage/Notification";
import QuestionPanel from "./components/BattlePage/QuestionPanel";
import BattleResultModal from "./components/BattlePage/BattleResultModal.jsx";
import { establishSocketConnection } from "./components/socket.js";
import { SERVER_URL } from "./config.js";
import {
  clearBattleSession,
  getStoredBattle,
  getStoredBattleNote,
  getStoredBattleResultDetails,
  getStoredRoomId,
  getStoredServerTimeOffset,
  getStoredWaitingState,
  persistBattleContext,
  persistBattleResult,
  persistWaitingState,
} from "./features/battle/sessionStorage.js";

function getSyncedTimeRemaining(battleEndsAt, battleDurationSeconds, serverTimeOffsetMs = 0) {
  const syncedNow = Date.now() + serverTimeOffsetMs;
  if (battleEndsAt > 0) {
    return Math.max(0, Math.ceil((battleEndsAt - syncedNow) / 1000));
  }

  return battleDurationSeconds;
}

function BattlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const hasAutoSubmittedRef = useRef(false);

  const [parentCode, setParentCode] = useState("");
  const [parentLanguage, setParentLanguage] = useState("python");
  const [activeTab, setActiveTab] = useState("problem");
  const [output, setOutput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isWaiting, setIsWaiting] = useState(getStoredWaitingState);
  const [battleNote, setBattleNote] = useState(getStoredBattleNote);
  const [battleResultDetails, setBattleResultDetails] = useState(getStoredBattleResultDetails);

  const battle = getStoredBattle(location.state?.battle);
  const problem = battle?.question || {};
  const roomId = getStoredRoomId(location.state?.roomId);
  const userId = sessionStorage.getItem("userId");
  const serverTimeOffsetMs = Number.isFinite(Number(battle?.serverTimeOffsetMs))
    ? Number(battle.serverTimeOffsetMs)
    : getStoredServerTimeOffset();
  const battleDurationSeconds = Number(battle?.battleDurationSeconds || 1800);
  const battleEndsAt = Number(battle?.battleEndsAt || 0);
  const [timeRemaining, setTimeRemaining] = useState(() =>
    getSyncedTimeRemaining(battleEndsAt, battleDurationSeconds, serverTimeOffsetMs),
  );

  useEffect(() => {
    persistBattleContext(location.state?.battle, location.state?.roomId);
  }, [location.state]);

  useEffect(() => {
    setTimeRemaining(getSyncedTimeRemaining(battleEndsAt, battleDurationSeconds, serverTimeOffsetMs));
  }, [battleDurationSeconds, battleEndsAt, serverTimeOffsetMs]);

  useEffect(() => {
    if (!isWaiting && !battleNote) {
      setShowModal(false);
      return undefined;
    }

    const timeoutId = setTimeout(() => setShowModal(true), 50);
    return () => clearTimeout(timeoutId);
  }, [battleNote, isWaiting]);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 3300);
  };

  const submitBattleResult = ({ code, language, timeRemaining: remainingTime }) => {
    if (hasAutoSubmittedRef.current || isWaiting || battleNote || !battle?.battleId) {
      return;
    }

    const activeSocket = establishSocketConnection();
    if (!activeSocket) {
      setOutput(<div className="text-red-400">Socket connection unavailable.</div>);
      return;
    }

    hasAutoSubmittedRef.current = true;
    activeSocket.emit("battleEnded", {
      battleDetails: {
        battleId: battle.battleId,
        timeRemaining: remainingTime,
        language,
      },
      userId,
      code,
      roomId,
    });

    setIsWaiting(true);
    persistWaitingState(true);
  };

  useEffect(() => {
    const activeSocket = establishSocketConnection();
    if (!activeSocket) {
      return undefined;
    }

    if (isWaiting || battleNote) {
      return undefined;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (getSyncedTimeRemaining(battleEndsAt, battleDurationSeconds, serverTimeOffsetMs) <= 0) {
      return undefined;
    }

    intervalRef.current = setInterval(() => {
      const syncedTimeRemaining = getSyncedTimeRemaining(battleEndsAt, battleDurationSeconds, serverTimeOffsetMs);
      setTimeRemaining(syncedTimeRemaining);

      if (syncedTimeRemaining <= 0 && !hasAutoSubmittedRef.current && battle?.battleId) {
        hasAutoSubmittedRef.current = true;
        activeSocket.emit("battleEnded", {
          battleDetails: {
            battleId: battle.battleId,
            timeRemaining: 0,
            language: parentLanguage,
          },
          userId,
          code: parentCode,
          roomId,
        });
        setIsWaiting(true);
        persistWaitingState(true);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [
    battle?.battleId,
    battleDurationSeconds,
    battleEndsAt,
    battleNote,
    isWaiting,
    parentCode,
    parentLanguage,
    roomId,
    serverTimeOffsetMs,
    userId,
  ]);

  useEffect(() => {
    const activeSocket = establishSocketConnection();
    if (!activeSocket) {
      return undefined;
    }

    const handleBattleResult = (note) => {
      const normalizedNote = typeof note === "string" ? note : (note?.result || "");
      const details = note && typeof note === "object" ? note : null;

      setBattleNote(normalizedNote);
      setBattleResultDetails(details);
      setIsWaiting(false);
      persistBattleResult(normalizedNote, details);
      persistWaitingState(false);
    };

    activeSocket.on("battleResult", handleBattleResult);
    return () => activeSocket.off("battleResult", handleBattleResult);
  }, []);

  const handleRunCode = async (code, language, activeProblem) => {
    setActiveTab("output");
    setOutput(<div className="text-gray-400">Running...</div>);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${SERVER_URL}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ code, language, problem: activeProblem }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      setOutput(<ErrorFormatter data={data} />);

      if (data.isError) {
        addNotification(`${data.errorType}`, "error");
      } else {
        addNotification("All test cases passed", "success");
      }
    } catch (error) {
      console.error(error);
      setOutput(
        <div className="text-red-400">
          <div className="mb-2 font-semibold">Error running code</div>
          <div className="text-sm">{error.message}</div>
        </div>,
      );
      addNotification("Failed to execute code", "error");
    }
  };

  const handleSubmit = async (code, language, activeProblem) => {
    if (hasAutoSubmittedRef.current || isWaiting || battleNote) {
      return;
    }

    setActiveTab("output");
    setOutput(<div className="text-gray-400">Submitting...</div>);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${SERVER_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ code, language, problem: activeProblem }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      setOutput(<ErrorFormatter data={data} />);

      if (data.isError) {
        addNotification(`${data.errorType}`, "error");
        return;
      }

        addNotification("All test cases passed successfully!", "success");
        submitBattleResult({
          code,
          language,
          timeRemaining: getSyncedTimeRemaining(battleEndsAt, battleDurationSeconds, serverTimeOffsetMs),
        });
    } catch (error) {
      console.error(error);
      setOutput(
        <div className="text-red-400">
          <div className="mb-2 font-semibold">Error submitting code</div>
          <div className="text-sm">{error.message}</div>
        </div>,
      );
      addNotification("Failed to submit code", "error");
    }
  };

  const handleDashboardRedirect = () => {
    clearBattleSession();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex h-screen flex-col">
      <Navbar
        addNotification={addNotification}
        timeRemaining={timeRemaining}
        battleId={battle?.battleId}
        roomId={roomId}
      />
      <div
        className={`main-container flex h-[calc(100vh-70px)] gap-[2px] overflow-hidden bg-transparent ${
          isWaiting || battleNote ? "pointer-events-none blur-sm" : ""
        }`}
      >
        <QuestionPanel
          problem={problem}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          output={output}
        />
        <EditorPanel
          onRun={handleRunCode}
          onSubmit={handleSubmit}
          problem={problem}
          setParentCode={setParentCode}
          setParentLanguage={setParentLanguage}
        />
      </div>
      {notifications.map((notification) => (
        <Notification key={notification.id} message={notification.message} type={notification.type} />
      ))}
      <BattleResultModal
        battleNote={battleNote}
        battleResultDetails={battleResultDetails}
        isWaiting={isWaiting}
        onReturnToDashboard={handleDashboardRedirect}
        showModal={showModal}
      />
    </div>
  );
}

export default BattlePage;
