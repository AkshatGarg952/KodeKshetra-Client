import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlusCircle, faRefresh, faCopy, faCheck, faTree, faCode, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom"; // make sure this is imported

function CreateRoomModal({ activeModal, hideModal, showNotification, generateNewRoomId }) {
  const [roomId, setRoomId] = useState('BATTLE-2025-ABC123');
  const [battleMode, setBattleMode] = useState('');
  const [topic, setTopic] = useState('random');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const modalJustOpened = useRef(false);

  // Topics for different modes
  const dsaTopics = [
  { label: 'Array', value: 'array' },
  { label: 'String', value: 'string' },
  { label: 'Linked List', value: 'linkedlist' },
  { label: 'Doubly Linked List', value: 'doublylinkedlist' },
  { label: 'Stack', value: 'stack' },
  { label: 'Queue', value: 'queue' },
  { label: 'Heap', value: 'heap' },
  { label: 'Hash Table', value: 'hashtable' },
  { label: 'Math', value: 'math' },
  { label: 'Two Pointers', value: 'twopointers' },
  { label: 'Sliding Window', value: 'slidingwindow' },
  { label: 'BFS', value: 'bfs' },
  { label: 'DFS', value: 'dfs' },
  { label: 'Matrix', value: 'matrix' },
  { label: 'Bit Manipulation', value: 'bitmanipulation' },
  { label: 'Prefix Sum', value: 'prefixsum' },
  { label: 'Tree', value: 'tree' },
  { label: 'Binary Tree', value: 'binarytree' },
  { label: 'Binary Search Tree', value: 'binarysearchtree' },
  { label: 'Graph', value: 'graph' },
  { label: 'Union Find', value: 'unionfind' },
  { label: 'Number Theory', value: 'numbertheory' },
  { label: 'Ordered Set', value: 'orderedset' },
  { label: 'Segment Tree', value: 'segmenttree' },
  { label: 'Fenwick Tree (BIT)', value: 'binaryindexedtree' },
  { label: 'Trie', value: 'trie' },
  { label: 'Combinatorics', value: 'combinatorics' },
  { label: 'Bitmask', value: 'bitmask' },
  { label: 'Divide and Conquer', value: 'divideandconquer' },
  { label: 'Recursion', value: 'recursion' },
  { label: 'Backtracking', value: 'backtracking' },
  { label: 'Dynamic Programming', value: 'dp' },
  { label: 'Memoization', value: 'memoization' },
  { label: 'Greedy', value: 'greedy' },
  { label: 'Game Theory', value: 'gametheory' },
  { label: 'Geometry', value: 'geometry' },
  { label: 'Hash Function', value: 'hashfunction' },
  { label: 'String Matching', value: 'stringmatching' },
  { label: 'Topological Sort', value: 'topologicalsort' },
  { label: 'Rolling Hash', value: 'rollinghash' },
  { label: 'Monotonic Stack', value: 'monotonicstack' },
  { label: 'Monotonic Queue', value: 'monotonicqueue' },
  { label: 'Merge Sort', value: 'mergesort' },
  { label: 'Counting Sort', value: 'countingsort' },
  { label: 'Quickselect', value: 'quickselect' },
  { label: 'Suffix Array', value: 'suffixarray' },
  { label: 'Line Sweep', value: 'linesweep' },
  { label: 'Minimum Spanning Tree', value: 'minimumspanningtree' },
  { label: 'Bucket Sort', value: 'bucketsort' },
  { label: 'Radix Sort', value: 'radixsort' },
  { label: 'Rejection Sampling', value: 'rejectionsampling' },
  { label: 'Biconnected Component', value: 'biconnectedcomponent' },
];


  const cpTopics = [
  { label: 'Implementation', value: 'implementation' },
  { label: 'Math', value: 'math' },
  { label: 'Greedy', value: 'greedy' },
  { label: 'Dynamic Programming', value: 'dp' },
  { label: 'Data Structures', value: 'data-structures' },
  { label: 'Brute Force', value: 'brute-force' },
  { label: 'Constructive Algorithms', value: 'constructive-algorithms' },
  { label: 'Graphs', value: 'graph' },
  { label: 'Sorting', value: 'sorting' },
  { label: 'Binary Search', value: 'searching' },
  { label: 'DFS', value: 'dfs' },
  { label: 'Trees', value: 'trees' },
  { label: 'Strings', value: 'string' },
  { label: 'Number Theory', value: 'numbertheory' },
  { label: 'Combinatorics', value: 'combinatorics' },
  { label: 'Special', value: 'special' },
  { label: 'Geometry', value: 'geometry' },
  { label: 'Bitmasks', value: 'bitmask' },
  { label: 'Two Pointers', value: 'twopointers' },
  { label: 'Disjoint Set Union (DSU)', value: 'unionfind' },
  { label: 'Shortest Paths', value: 'shortestpath' },
  { label: 'Probabilities', value: 'probabilities' },
  { label: 'Divide and Conquer', value: 'divideandconquer' },
  { label: 'Hashing', value: 'hashfunction' },
  { label: 'Games', value: 'gametheory' },
  { label: 'Flows', value: 'flow-matching' },
];


  // Pick topics based on battleMode
  const topicOptions = battleMode === 'cp' ? cpTopics : dsaTopics;

  useEffect(() => {
    if (activeModal === 'create-room-modal') {
      if (!modalJustOpened.current) {
        setRoomId(generateNewRoomId());
        setBattleMode("");
        setTopic("random");
        setCopied(false);
        modalJustOpened.current = true;
      }
    } else {
      modalJustOpened.current = false;
    }
  }, [activeModal]);

  const handleRegenerate = () => {
    setRoomId(generateNewRoomId());
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      showNotification('Room ID copied to clipboard!', 'success');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((error) => {
      showNotification('Failed to copy Room ID', 'error');
      console.error('Copy failed:', error);
    });
  };

  const getRandomTopic = () => {
    const options = topicOptions.length > 0 ? topicOptions : [...dsaTopics, ...cpTopics];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].toLowerCase().replace(/ & /g, '-');
  };

  const getRandomBattleMode = () => {
    const modes = ['dsa', 'cp'];
    const randomIndex = Math.floor(Math.random() * modes.length);
    return modes[randomIndex];
  };

  const handleCreate = () => {
    const finalBattleMode = battleMode || getRandomBattleMode();
    const options = finalBattleMode === 'cp' ? cpTopics : dsaTopics;
    const finalTopic = topic === 'random'
      ? options[Math.floor(Math.random() * options.length)].toLowerCase().replace(/ & /g, '-')
      : topic;

    const displayTopic = topic === 'random'
      ? options[Math.floor(Math.random() * options.length)]
      : topic.charAt(0).toUpperCase() + topic.slice(1).replace(/-/g, ' & ');

    if (roomId.trim() && userId) {
      hideModal('create-room-modal');
      showNotification(`Room created: ${roomId} (${finalBattleMode} - ${displayTopic})`, 'success');
      navigate("/waitingpage", {
        state: {
          roomId,
          battle: {
            mode: finalBattleMode,
            topic: finalTopic
          },
        },
        replace: true,
      });
    } else {
      console.log("Missing roomId or userId", { roomId, userId });
      showNotification('Please enter a valid Room ID', 'error');
    }
  };

  return (
    <div
      className={`modal-overlay fixed inset-0 bg-black/80 backdrop-blur-lg z-[10000] flex items-center justify-center transition-all duration-300 ${
        activeModal === 'create-room-modal' ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => e.target.classList.contains('modal-overlay') && hideModal('create-room-modal')}
    >
      <div
        className="modal-container create-room-container bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl border-2 border-neon-cyan backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,245,255,0.3)] max-w-xl w-[90%] max-h-[85vh] overflow-y-auto transition-transform duration-300"
        style={{ transform: activeModal === 'create-room-modal' ? 'scale(1)' : 'scale(0.8)' }}
      >
        {/* Header */}
        <div className="modal-header flex justify-between items-center p-4 border-b border-neon-cyan/20">
          <h3 className="text-lg font-bold text-text-primary">Create Battle Room</h3>
          <button
            className="close-modal w-9 h-9 rounded-full bg-flame-red/20 text-flame-red flex items-center justify-center transition-all hover:bg-flame-red hover:text-text-primary hover:scale-110"
            onClick={() => hideModal('create-room-modal')}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content p-4">
          {/* Room ID */}
          <div className="input-group mb-4">
            <label htmlFor="generated-room-id" className="block mb-2 font-semibold text-text-primary">
              Room ID
            </label>
            <div className="input-container relative flex items-center">
              <input
                type="text"
                id="generated-room-id"
                value={roomId}
                readOnly
                className="w-full p-3 border-2 border-neon-cyan/30 bg-slate-gray/50 rounded-xl text-text-primary font-jetbrains transition-all focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
              />
              <div className="input-actions absolute right-2 flex gap-1">
                <button
                  className="action-btn w-8 h-8 rounded-lg bg-matrix-lime/20 text-matrix-lime flex items-center justify-center transition-all hover:bg-matrix-lime hover:text-void-black"
                  onClick={handleRegenerate}
                  title="Generate New ID"
                >
                  <FontAwesomeIcon icon={faRefresh} />
                </button>
                <button
                  className="action-btn w-8 h-8 rounded-lg bg-neon-cyan/20 text-neon-cyan flex items-center justify-center transition-all hover:bg-neon-cyan hover:text-void-black"
                  onClick={handleCopy}
                  title="Copy Room ID"
                >
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                </button>
              </div>
            </div>
          </div>

          {/* Battle Mode */}
          <div className="input-group mb-4">
            <label className="block mb-2 font-semibold text-text-primary">
              Battle Mode
            </label>
            <div className="mode-selector flex flex-col gap-2">
              {[
                { id: 'mode-dsa', value: 'dsa', label: 'Data Structures & Algorithms', icon: faTree },
                { id: 'mode-cp', value: 'cp', label: 'Competitive Programming', icon: faCode },
              ].map((mode) => (
                <div key={mode.id} className="w-full">
                  <input
                    type="radio"
                    id={mode.id}
                    name="battle-mode"
                    value={mode.value}
                    checked={battleMode === mode.value}
                    onChange={() => setBattleMode(mode.value)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={mode.id}
                    className="mode-option flex items-center gap-3 p-3 border-2 border-neon-cyan/30 rounded-xl cursor-pointer transition-all bg-slate-gray/30 hover:border-neon-cyan hover:bg-neon-cyan/10 peer-checked:border-neon-cyan peer-checked:bg-neon-cyan/20 peer-checked:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                  >
                    <FontAwesomeIcon icon={mode.icon} className="text-neon-cyan text-md" />
                    <span>{mode.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div className="input-group mb-4">
            <label className="block mb-2 font-semibold text-text-primary">
              Topic Selection
            </label>
            <div className="topic-selector relative">
              <select
  id="topic-select"
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  disabled={!battleMode} // disable until mode selected
  className="w-full p-3 border-2 border-neon-cyan/30 bg-slate-gray/50 rounded-xl text-text-primary font-space cursor-pointer transition-all focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_20px_rgba(0,245,255,0.3)] appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
>
  <option value="random">Random Topic</option>
  {topicOptions.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>

              <FontAwesomeIcon icon={faChevronDown} className="select-icon absolute right-3 top-1/2 -translate-y-1/2 text-neon-cyan pointer-events-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions flex gap-3 justify-end">
            <button
              className="btn btn-secondary px-5 py-2 border-2 border-text-muted bg-transparent text-text-muted rounded-xl font-semibold transition-all hover:bg-text-muted hover:text-void-black"
              onClick={() => hideModal('create-room-modal')}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-5 py-2 bg-gradient-dashboard text-text-primary rounded-xl font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,245,255,0.4)]"
              onClick={handleCreate}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomModal;
