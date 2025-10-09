import React, { useState, useEffect } from 'react';


const NeuralNetwork = () => {
  const [neuralState, setNeuralState] = useState({
    unlockedNodes: [],
    totalNodes: 5,
    centeredCard: null,
    isAnimating: false
  });


  const [matrixRain, setMatrixRain] = useState([]);


  useEffect(() => {
    // Generate matrix rain
    const matrixChars = ['0', '1', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ'];
    const drops = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
      left: Math.random() * 100,
      delay: Math.random() * 20
    }));
    setMatrixRain(drops);
  }, []);


  const nodes = [
    {
      step: 1,
      position: 'top',
      color: 'crimson',
      icon: 'fas fa-rocket',
      title: 'Weapon Selection Matrix',
      description: 'Advanced arsenal selection system allowing strategic choice between Data Structures & Algorithms for foundational combat or Competitive Programming for elite tactical operations.'
    },
    {
      step: 2,
      position: 'right',
      color: 'azure',
      icon: 'fas fa-crosshairs',
      title: 'Domain Targeting System',
      description: 'Precision-engineered topic selection interface covering Dynamic Programming mastery, Graph theory warfare, Array manipulation tactics, and Tree traversal strategies.'
    },
    {
      step: 3,
      position: 'bottom-right',
      color: 'emerald',
      icon: 'fas fa-users-line',
      title: 'Rival Matchmaking Engine',
      description: 'Sophisticated opponent pairing algorithm supporting private duels with friends or global matchmaking with skill-based ranking and compatibility analysis.'
    },
    {
      step: 4,
      position: 'bottom-left',
      color: 'violet',
      icon: 'fas fa-swords',
      title: 'Real-Time Battle Arena',
      description: 'High-performance IDE environment featuring real-time code execution, live result streaming, syntax highlighting, and intelligent auto-completion systems.'
    },
    {
      step: 5,
      position: 'left',
      color: 'amber',
      icon: 'fas fa-trophy',
      title: 'Victory Achievement Core',
      description: 'Comprehensive victory tracking system with XP accumulation, prestigious badge unlocking, and dynamic leaderboard ranking across multiple skill categories.'
    }
  ];


  const getNodePositionClasses = (position) => {
    const positions = {
      'top': 'top-4 left-1/2 -translate-x-1/2',
      'right': 'top-1/2 right-8 -translate-y-1/2',
      'bottom-right': 'bottom-8 right-1/4',
      'bottom-left': 'bottom-8 left-1/4',
      'left': 'top-1/2 left-8 -translate-y-1/2'
    };
    return positions[position] || '';
  };


  const getColorClasses = (color) => {
    const colors = {
      crimson: {
        border: 'border-red-600',
        glow: 'shadow-[0_0_30px_rgba(220,20,60,0.3)]',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        accent: '#dc143c'
      },
      azure: {
        border: 'border-blue-500',
        glow: 'shadow-[0_0_30px_rgba(0,127,255,0.3)]',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        accent: '#007fff'
      },
      emerald: {
        border: 'border-green-500',
        glow: 'shadow-[0_0_30px_rgba(80,200,120,0.3)]',
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        accent: '#50c878'
      },
      violet: {
        border: 'border-purple-600',
        glow: 'shadow-[0_0_30px_rgba(138,43,226,0.3)]',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        accent: '#8a2be2'
      },
      amber: {
        border: 'border-yellow-500',
        glow: 'shadow-[0_0_30px_rgba(255,191,0,0.3)]',
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        accent: '#ffbf00'
      }
    };
    return colors[color] || colors.azure;
  };


  const handleNodeClick = (step, e) => {
    e.stopPropagation();
    if (neuralState.isAnimating) return;


    const node = nodes.find(n => n.step === step);
    const isUnlocked = neuralState.unlockedNodes.includes(step);


    setNeuralState(prev => ({ ...prev, isAnimating: true }));


    setNeuralState(prev => ({
      ...prev,
      centeredCard: node,
      isAnimating: false
    }));


    if (!isUnlocked) {
      setTimeout(() => {
        setNeuralState(prev => ({
          ...prev,
          unlockedNodes: [...prev.unlockedNodes, step]
        }));
      }, 500);
    }
  };


  const handleCloseCard = () => {
    setNeuralState(prev => ({
      ...prev,
      centeredCard: null,
      isAnimating: false
    }));
  };


  const progressPercentage = (neuralState.unlockedNodes.length / neuralState.totalNodes) * 100;


  return (
    <section className="py-20 bg-black relative overflow-hidden" id="how-it-works">
      <div 
        className="absolute top-0 left-0 w-full h-full z-[1]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(30, 30, 30, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(40, 40, 40, 0.2) 0%, transparent 50%)
          `
        }}
      />


      <div className="max-w-7xl mx-auto px-8 relative z-[2]">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 font-mono text-sm text-cyan-400 opacity-70 tracking-[3px]">
            &lt; NEURAL PROTOCOL &gt;
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight relative"
            style={{
              background: 'linear-gradient(135deg, #00BFFF 0%, #00FFFF 50%, #39FF14 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            Neural Domination Protocol
            <span 
              className="absolute top-0 left-0 w-full h-full opacity-0"
              style={{
                background: 'linear-gradient(135deg, #39FF14 0%, #00FFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'neuralGlitch 4s ease-in-out infinite'
              }}
            >
              NEURAL DOMINATION PROTOCOL
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Click on any neural node to unlock and explore advanced coding capabilities
          </p>


          <div className="flex flex-col items-center gap-3 mt-6">
            <div className="w-80 md:w-96 h-2 bg-gray-900/80 rounded-full border-2 border-cyan-500 relative overflow-hidden">
              <div 
                className="h-full rounded-lg transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  width: `${progressPercentage}%`,
                  background: 'linear-gradient(90deg, #00BFFF 0%, #00FFFF 50%, #39FF14 100%)',
                  boxShadow: '0 0 15px #00BFFF'
                }}
              />
              <div 
                className="absolute top-0 left-0 w-5 h-full opacity-70"
                style={{
                  background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
                  animation: 'neuralScan 2s linear infinite'
                }}
              />
            </div>
            <span className="font-mono text-cyan-400 text-base font-semibold">
              {neuralState.unlockedNodes.length === neuralState.totalNodes 
                ? '🧠 NEURAL DOMINATION PROTOCOL COMPLETE!'
                : `${neuralState.unlockedNodes.length}/${neuralState.totalNodes} Neural Nodes Activated`
              }
            </span>
          </div>
        </div>


        <div className="relative max-w-6xl mx-auto h-[700px] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1]">
            {matrixRain.map((drop) => (
              <div
                key={drop.id}
                className="absolute text-xs text-cyan-500 opacity-10"
                style={{
                  left: `${drop.left}%`,
                  animationDelay: `${drop.delay}s`,
                  animation: 'matrixDrop 10s linear infinite'
                }}
              >
                {drop.char}
              </div>
            ))}
          </div>


          <svg className="absolute top-0 left-0 w-full h-full z-[3] pointer-events-none" viewBox="0 0 1200 700">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#00BFFF" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            <line className="opacity-30" x1="600" y1="350" x2="600" y2="80" stroke="url(#lineGradient)" strokeWidth="2" style={{ animation: 'connectionPulse 3s ease-in-out infinite' }}/>
            <line className="opacity-30" x1="600" y1="350" x2="1050" y2="350" stroke="url(#lineGradient)" strokeWidth="2" style={{ animation: 'connectionPulse 3s ease-in-out infinite 0.3s' }}/>
            <line className="opacity-30" x1="600" y1="350" x2="900" y2="600" stroke="url(#lineGradient)" strokeWidth="2" style={{ animation: 'connectionPulse 3s ease-in-out infinite 0.6s' }}/>
            <line className="opacity-30" x1="600" y1="350" x2="300" y2="600" stroke="url(#lineGradient)" strokeWidth="2" style={{ animation: 'connectionPulse 3s ease-in-out infinite 0.9s' }}/>
            <line className="opacity-30" x1="600" y1="350" x2="150" y2="350" stroke="url(#lineGradient)" strokeWidth="2" style={{ animation: 'connectionPulse 3s ease-in-out infinite 1.2s' }}/>
          </svg>


          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-10 text-center">
            <div 
              className="w-32 h-32 rounded-full border-3 border-cyan-400 flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.98), rgba(20, 20, 20, 0.95))',
                animation: 'brainPulse 3s ease-in-out infinite',
                boxShadow: '0 0 40px rgba(0, 191, 255, 0.4), inset 0 0 20px rgba(0, 191, 255, 0.1)'
              }}
            >
              <div 
                className="absolute w-40 h-40 border-2 border-cyan-400 rounded-full -top-4 -left-4 opacity-0"
                style={{ animation: 'corePulseExpand 2s ease-out infinite' }}
              />
              <i 
                className="fas fa-brain text-5xl text-cyan-400"
                style={{ filter: 'drop-shadow(0 0 10px #00BFFF)' }}
              />
            </div>
            <h3 className="mt-4 text-sm text-cyan-300 font-semibold tracking-wide">CodeVersus Neural Core</h3>
          </div>


          {neuralState.centeredCard && (
            <div 
              className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center"
              style={{
                animation: 'fadeIn 0.4s ease-out'
              }}
              onClick={handleCloseCard}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full bg-black/80 backdrop-blur-md"
                style={{
                  animation: 'fadeIn 0.3s ease-out'
                }}
              />


              <div 
                className={`relative max-w-xl w-full mx-8 ${getColorClasses(neuralState.centeredCard.color).bg} rounded-3xl p-10 border-2 ${getColorClasses(neuralState.centeredCard.color).border} ${getColorClasses(neuralState.centeredCard.color).glow} backdrop-blur-xl`}
                style={{
                  animation: 'cardSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  background: 'linear-gradient(145deg, rgba(10, 10, 10, 0.98), rgba(25, 25, 25, 0.95))'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-6 mb-6">
                  <div 
                    className={`w-20 h-20 rounded-2xl border-2 ${getColorClasses(neuralState.centeredCard.color).border} ${getColorClasses(neuralState.centeredCard.color).glow} flex items-center justify-center`}
                    style={{
                      background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.9))'
                    }}
                  >
                    <i 
                      className={`${neuralState.centeredCard.icon} text-4xl ${getColorClasses(neuralState.centeredCard.color).text}`}
                      style={{ filter: 'drop-shadow(0 0 10px currentColor)' }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-mono text-xs text-gray-500 mb-2 tracking-wider">
                      NODE #{neuralState.centeredCard.step} • {neuralState.unlockedNodes.includes(neuralState.centeredCard.step) ? 'ACTIVATED' : 'UNLOCKING...'}
                    </div>
                    <h3 className={`text-2xl font-bold ${getColorClasses(neuralState.centeredCard.color).text}`}>
                      {neuralState.centeredCard.title}
                    </h3>
                  </div>
                </div>


                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {neuralState.centeredCard.description}
                </p>


                <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-800">
                  <i className="fas fa-hand-pointer text-gray-500 text-sm animate-pulse" />
                  <span className="font-mono text-sm text-gray-500">
                    Click anywhere on screen to close
                  </span>
                </div>
              </div>
            </div>
          )}


          {nodes.map((node) => {
            const colorClasses = getColorClasses(node.color);
            const isUnlocked = neuralState.unlockedNodes.includes(node.step);
            const isCardShown = neuralState.centeredCard?.step === node.step;
            
            return (
              <div
                key={node.step}
                className={`absolute w-36 h-36 cursor-pointer transition-all duration-500 ease-out z-[5] ${getNodePositionClasses(node.position)}`}
                onClick={(e) => handleNodeClick(node.step, e)}
                style={{
                  opacity: neuralState.centeredCard && !isCardShown ? 0.2 : 1,
                  filter: neuralState.centeredCard && !isCardShown ? 'blur(4px)' : 'none',
                  transform: isCardShown ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {!isUnlocked && (
                  <div 
                    className={`w-36 h-36 rounded-full border-2 ${colorClasses.border} flex items-center justify-center overflow-hidden transition-all duration-700 hover:scale-110 hover:${colorClasses.glow}`}
                    style={{
                      background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.9))'
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div 
                        className="absolute top-0 left-0 w-full h-full opacity-5"
                        style={{
                          background: `
                            linear-gradient(45deg, transparent 48%, ${colorClasses.accent} 49%, ${colorClasses.accent} 51%, transparent 52%),
                            linear-gradient(-45deg, transparent 48%, ${colorClasses.accent} 49%, ${colorClasses.accent} 51%, transparent 52%)
                          `,
                          backgroundSize: '15px 15px',
                          animation: 'matrixScroll 10s linear infinite'
                        }}
                      />
                      <i 
                        className={`fas fa-lock text-3xl ${colorClasses.text} z-[2]`}
                        style={{
                          filter: 'drop-shadow(0 0 10px currentColor)',
                          animation: 'lockPulse 2s ease-in-out infinite'
                        }}
                      />
                    </div>
                  </div>
                )}


                {isUnlocked && (
                  <div 
                    className={`w-36 h-36 rounded-full border-3 ${colorClasses.border} ${colorClasses.glow} flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:scale-110`}
                    style={{
                      background: 'linear-gradient(145deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.9))',
                      animation: isCardShown ? 'nodePulse 0.5s ease-in-out' : 'none'
                    }}
                  >
                    <i 
                      className={`${node.icon} text-4xl ${colorClasses.text} transition-all duration-500 z-[2]`}
                      style={{ filter: 'drop-shadow(0 0 15px currentColor)' }}
                    />
                    <div 
                      className={`absolute -top-2 -left-2 -right-2 -bottom-2 rounded-full opacity-10 z-[1]`}
                      style={{
                        background: `radial-gradient(circle, ${colorClasses.accent} 0%, transparent 70%)`,
                        animation: 'nodeGlowPulse 3s ease-in-out infinite'
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }


        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }


        @keyframes nodePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }


        @keyframes neuralGlitch {
          0%, 90%, 100% {
            opacity: 0;
          }
          92%, 98% {
            opacity: 0.8;
          }
        }


        @keyframes brainPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 40px rgba(0, 191, 255, 0.4), inset 0 0 20px rgba(0, 191, 255, 0.1);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 60px rgba(0, 191, 255, 0.5), inset 0 0 30px rgba(0, 191, 255, 0.2);
          }
        }


        @keyframes corePulseExpand {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }


        @keyframes neuralScan {
          0% {
            left: 0%;
          }
          100% {
            left: 100%;
          }
        }


        @keyframes connectionPulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }


        @keyframes matrixDrop {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }


        @keyframes matrixScroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100px;
          }
        }


        @keyframes lockPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }


        @keyframes nodeGlowPulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
};


export default NeuralNetwork;
