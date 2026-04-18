import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/BattlePage/Navbar";
import QuestionPanel from "./components/BattlePage/QuestionPanel";
import EditorPanel from "./components/BattlePage/EditorPanel";
import Notification from "./components/BattlePage/Notification";
import ErrorFormatter from "./components/BattlePage/ErrorFormatter";
import { socket } from "./components/socket.js";
import { SERVER_URL } from "./config.js";


function BattlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const hasAutoSubmittedRef = useRef(false);

  const [parentCode, setParentCode] = useState("");
  const [parentLanguage, setParentLanguage] = useState("python");

  const getInitialBattle = () =>
    location.state?.battle ||
    JSON.parse(sessionStorage.getItem("battleData") || "{}");

  const getInitialRoomId = () =>
    location.state?.roomId ||
    JSON.parse(sessionStorage.getItem("roomId") || "null");

  const [activeTab, setActiveTab] = useState("problem");
  const [output, setOutput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [isWaiting, setIsWaiting] = useState(() => {
    return sessionStorage.getItem("isWaiting") === "true";
  });

  const [battleNote, setBattleNote] = useState(() => {
    return sessionStorage.getItem("battleResultNote") || "";
  });

  useEffect(() => {
    const battle = location.state?.battle;
    const roomId = location.state?.roomId;
    if (battle) sessionStorage.setItem("battleData", JSON.stringify(battle));
    if (roomId !== undefined && roomId !== null)
      sessionStorage.setItem("roomId", JSON.stringify(roomId));
  }, [location.state]);



  const battle = getInitialBattle();
  const problem = battle?.question || {};
  const roomId = getInitialRoomId();
  const userId = sessionStorage.getItem("userId");
  const battleDurationSeconds = Number(battle?.battleDurationSeconds || 1800);
  const battleEndsAt = Number(battle?.battleEndsAt || 0);

  const getSyncedTimeRemaining = () => {
    if (battleEndsAt > 0) {
      return Math.max(0, Math.ceil((battleEndsAt - Date.now()) / 1000));
    }

    return battleDurationSeconds;
  };

  const [timeRemaining, setTimeRemaining] = useState(getSyncedTimeRemaining);

  useEffect(() => {
    setTimeRemaining(getSyncedTimeRemaining());
  }, [battleEndsAt, battleDurationSeconds]);

  useEffect(() => {
    if (isWaiting || battleNote) {
      const timeoutId = setTimeout(() => setShowModal(true), 50);
      return () => clearTimeout(timeoutId);
    }

    setShowModal(false);
  }, [isWaiting, battleNote]);

  useEffect(() => {
    if (isWaiting || battleNote) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (getSyncedTimeRemaining() <= 0) return;

    intervalRef.current = setInterval(() => {
      const syncedTimeRemaining = getSyncedTimeRemaining();
      setTimeRemaining(syncedTimeRemaining);

      if (syncedTimeRemaining <= 0 && !hasAutoSubmittedRef.current) {
        hasAutoSubmittedRef.current = true;
        if (battle?.battleId) {
          const battleDetails = { battleId: battle.battleId, timeRemaining: 0, language: parentLanguage };
          socket.emit("battleEnded", { battleDetails, userId, code: parentCode, roomId });
          setIsWaiting(true);
          sessionStorage.setItem("isWaiting", "true");
        }
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [battle?.battleId, isWaiting, battleNote, parentLanguage, parentCode, roomId, userId, battleEndsAt, battleDurationSeconds]);

  useEffect(() => {
    const handleBattleResult = (note) => {
      setBattleNote(note);
      sessionStorage.setItem("battleResultNote", note);
      setIsWaiting(false);
      sessionStorage.removeItem("isWaiting");
    };

    socket.on("battleResult", handleBattleResult);
    return () => socket.off("battleResult", handleBattleResult);
  }, []);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
      3300
    );
  };

  const emitBattleEnded = (code, language) => {
    hasAutoSubmittedRef.current = true;
    const battleDetails = {
      battleId: battle.battleId,
      timeRemaining: getSyncedTimeRemaining(),
      language: language
    };
    socket.emit("battleEnded", { battleDetails, userId, code, roomId });
    setIsWaiting(true);
    sessionStorage.setItem("isWaiting", "true");
  };

  const handleRunCode = async (code, language, problem) => {
    setActiveTab("output");
    setOutput(<div className="text-gray-400">Running...</div>);
    try {
      const response = await fetch(`${SERVER_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problem }),
      });
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      const data = await response.json();

      setOutput(<ErrorFormatter data={data} />);

      if (data.isError) {
        addNotification(`${data.errorType}`, "error");
      } else {
        addNotification("All test cases passed", "success");
      }
    } catch (err) {
      console.error(err);
      setOutput(
        <div className="text-red-400">
          <div className="font-semibold mb-2">Error running code</div>
          <div className="text-sm">{err.message}</div>
        </div>
      );
      addNotification("Failed to execute code", "error");
    }
  };

  const handleSubmit = async (code, language, problem) => {
    setActiveTab("output");
    setOutput(<div className="text-gray-400">Submitting...</div>);
    try {
      const response = await fetch(`${SERVER_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, problem }),
      });
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      const data = await response.json();

      setOutput(<ErrorFormatter data={data} />);

      if (data.isError) {
        addNotification(`${data.errorType}`, "error");
      } else {
        addNotification("All test cases passed successfully!", "success");
        emitBattleEnded(code, language);
      }
    } catch (err) {
      console.error(err);
      setOutput(
        <div className="text-red-400">
          <div className="font-semibold mb-2">Error submitting code</div>
          <div className="text-sm">{err.message}</div>
        </div>
      );
      addNotification("Failed to submit code", "error");
    }
  };

  const getBattleOutcome = () => {
    if (!battleNote) return "waiting";

    const note = battleNote.toLowerCase();
    if (note === "won" || note.includes("won")) return "won";
    if (note === "loss" || note.includes("loss")) return "loss";
    if (note === "draw" || note.includes("draw")) return "draw";
    return "waiting";
  };

  const renderWaitingModal = () => {
    const handleDashboardRedirect = () => {
      sessionStorage.removeItem("battleData");
      sessionStorage.removeItem("roomId");
      sessionStorage.removeItem("isWaiting");
      sessionStorage.removeItem("battleResultNote");
      navigate("/dashboard", { replace: true });
    };

    const outcome = getBattleOutcome();

    const renderContent = () => {
      switch (outcome) {
        case "won":
          return (
            <>
              <Fireworks />
              <div className="animate-scaleIn">
                <div className="mb-6">
                  <div className="text-8xl animate-bounce-slow"><i className="fas fa-trophy"></i></div>
                </div>
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500 mb-6 animate-slideDown">
                  VICTORY!
                </h2>
                <p className="text-2xl text-gray-300 mb-4 animate-fadeIn animation-delay-300">
                  You conquered the challenge!
                </p>
                <div className="text-lg text-green-400 font-semibold mb-6 animate-pulse">
                  Outstanding Performance!
                </div>
                <button
                  onClick={handleDashboardRedirect}
                  className="mt-8 px-10 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all transform hover:scale-110 hover:rotate-1 shadow-2xl animate-fadeInUp animation-delay-500 border-2 border-green-400"
                >
                  Return to Dashboard →
                </button>
              </div>
            </>
          );

        case "loss":
          return (
            <>
              <FallingTears />
              <div className="animate-scaleIn">
                <div className="mb-6">
                  <div className="text-8xl animate-shake"><i className="fas fa-heart-broken"></i></div>
                </div>
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 mb-6 animate-slideDown">
                  DEFEAT
                </h2>
                <p className="text-2xl text-gray-300 mb-4 animate-fadeIn animation-delay-300">
                  Better luck next time, warrior!
                </p>
                <div className="text-lg text-red-400 font-semibold mb-6">
                  Keep practicing, you'll get them next time!
                </div>
                <button
                  onClick={handleDashboardRedirect}
                  className="mt-8 px-10 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-red-600 hover:via-rose-600 hover:to-pink-700 transition-all transform hover:scale-110 hover:-rotate-1 shadow-2xl animate-fadeInUp animation-delay-500 border-2 border-red-400"
                >
                  Return to Dashboard →
                </button>
              </div>
            </>
          );

        case "draw":
          return (
            <>
              <SparkleEffect />
              <div className="animate-scaleIn">
                <div className="mb-6">
                  <div className="text-8xl animate-spin-slow"><i className="fas fa-handshake"></i></div>
                </div>
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 mb-6 animate-slideDown">
                  STALEMATE
                </h2>
                <p className="text-2xl text-gray-300 mb-4 animate-fadeIn animation-delay-300">
                  An honorable draw between equals!
                </p>
                <div className="text-lg text-yellow-400 font-semibold mb-6 animate-pulse">
                  Well fought! Both warriors are evenly matched!
                </div>
                <button
                  onClick={handleDashboardRedirect}
                  className="mt-8 px-10 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600 text-white font-bold text-lg rounded-xl hover:from-yellow-600 hover:via-amber-600 hover:to-orange-700 transition-all transform hover:scale-110 shadow-2xl animate-fadeInUp animation-delay-500 border-2 border-yellow-400"
                >
                  Return to Dashboard →
                </button>
              </div>
            </>
          );

        default:
          return (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <div className="w-20 h-20 border-4 border-matrix-green border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
                Waiting for opponent...
              </h2>
              <p className="text-gray-400 animate-fadeIn animation-delay-300">
                Calculating battle results. Please hold tight!
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <div className="w-3 h-3 bg-matrix-green rounded-full animate-bounce animation-delay-0"></div>
                <div className="w-3 h-3 bg-matrix-green rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-3 h-3 bg-matrix-green rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          );
      }
    };

    return (
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-500 ${showModal ? 'bg-opacity-70' : 'bg-opacity-0'
          }`}
        style={{
          backdropFilter: showModal ? 'blur(10px)' : 'blur(0px)',
          WebkitBackdropFilter: showModal ? 'blur(10px)' : 'blur(0px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 text-center border-2 ${outcome === 'won' ? 'border-green-500 shadow-green-500/50' :
          outcome === 'loss' ? 'border-red-500 shadow-red-500/50' :
            outcome === 'draw' ? 'border-yellow-500 shadow-yellow-500/50' :
              'border-matrix-green shadow-matrix-green/50'
          } transform transition-all duration-500 ${showModal ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}>
          {renderContent()}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        addNotification={addNotification}
        timeRemaining={timeRemaining}
        battleId={battle.battleId}
        roomId={roomId}
      />
      <div
        className={`main-container flex h-[calc(100vh-70px)] gap-[2px] bg-transparent overflow-hidden ${(isWaiting || battleNote) ? 'pointer-events-none blur-sm' : ''
          }`}
      >
        <QuestionPanel
          problem={problem}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          output={output}
        />
        <EditorPanel onRun={handleRunCode} onSubmit={handleSubmit} problem={problem} setParentCode={setParentCode}
          setParentLanguage={setParentLanguage} />
      </div>
      {notifications.map((n) => (
        <Notification key={n.id} message={n.message} type={n.type} />
      ))}
      {(isWaiting || battleNote) && renderWaitingModal()}
    </div>
  );
}

const Fireworks = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 w-full h-full pointer-events-none z-40";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let rockets = [];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
        this.size = Math.random() * 4 + 2;
      }

      update() {
        this.velocity.y += 0.15;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Rocket {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height * 0.4 + 100;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.exploded = false;
        this.trail = [];
      }

      update() {
        if (!this.exploded) {
          this.y -= 5;
          this.trail.push({ x: this.x, y: this.y, alpha: 1 });
          if (this.trail.length > 10) this.trail.shift();

          if (this.y <= this.targetY) {
            this.explode();
          }
        }
      }

      explode() {
        this.exploded = true;
        const particleCount = Math.random() * 80 + 120;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw() {
        if (!this.exploded) {
          this.trail.forEach((point, index) => {
            ctx.globalAlpha = (index / this.trail.length) * 0.5;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.globalAlpha = 1;
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.08 && rockets.length < 6) {
        rockets.push(new Rocket());
      }

      rockets = rockets.filter((rocket) => {
        rocket.update();
        rocket.draw();
        return !rocket.exploded || rocket.y < canvas.height;
      });

      particles = particles.filter((particle) => {
        particle.update();
        particle.draw();
        return particle.alpha > 0;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  return null;
};

const FallingTears = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 w-full h-full pointer-events-none z-40";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    let tears = [];

    class Tear {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.length = Math.random() * 30 + 15;
        this.speed = Math.random() * 4 + 3;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.wobble = Math.random() * 2 - 1;
      }

      update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * this.wobble;
        if (this.y > canvas.height + this.length) {
          this.y = -this.length;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        gradient.addColorStop(0, `rgba(100, 149, 237, 0)`);
        gradient.addColorStop(0.5, `rgba(100, 149, 237, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(100, 149, 237, ${this.opacity * 0.5})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();

        ctx.fillStyle = `rgba(100, 149, 237, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(100, 149, 237, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.length, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) {
      tears.push(new Tear());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      tears.forEach((tear) => {
        tear.update();
        tear.draw();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  return null;
};

const SparkleEffect = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "fixed inset-0 w-full h-full pointer-events-none z-40";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    let sparkles = [];

    class Sparkle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = Math.random() * 2 + 1;
        this.life = 100;
        this.maxLife = 100;
        this.color = `hsl(${Math.random() * 60 + 30}, 100%, ${Math.random() * 30 + 60}%)`;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.life--;

        if (this.life <= 0 || this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * -100;
          this.life = this.maxLife;
          this.size = Math.random() * 4 + 2;
        }
      }

      draw() {
        const opacity = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          const angle2 = angle + Math.PI / 5;
          const x2 = Math.cos(angle2) * (this.size / 2);
          const y2 = Math.sin(angle2) * (this.size / 2);
          ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < 100; i++) {
      sparkles.push(new Sparkle());
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach((sparkle) => {
        sparkle.update();
        sparkle.draw();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  return null;
};

export default BattlePage;
