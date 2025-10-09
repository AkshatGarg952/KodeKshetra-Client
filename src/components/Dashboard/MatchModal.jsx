import { faTimes, faPlusCircle, faTree, faCode, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function MatchModal({ activeModal, hideModal, showNotification }) {
  const [battleMode, setBattleMode] = useState('');
  const [topic, setTopic] = useState('random');
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const modalJustOpened = useRef(false);

  // DSA Topics (unchanged)
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
    { label: 'Trees', value: 'tree' },
    { label: 'Strings', value: 'string' },
    { label: 'Number Theory', value: 'number theory' },
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

  const topicOptions = battleMode === 'cp' ? cpTopics : dsaTopics;

  const getRandomTopic = () => {
    const options = topicOptions.length > 0 ? topicOptions : [...dsaTopics, ...cpTopics];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].value;
  };

  const getRandomBattleMode = () => {
    const modes = ['dsa', 'cp'];
    const randomIndex = Math.floor(Math.random() * modes.length);
    return modes[randomIndex];
  };

  const handleCreate = () => {
    const finalBattleMode = battleMode || getRandomBattleMode();
    const options = finalBattleMode === 'cp' ? cpTopics : dsaTopics;

    const randomTopic = options[Math.floor(Math.random() * options.length)];
    const finalTopic = topic === 'random' ? randomTopic.value : topic;
    const displayTopic = topic === 'random' ? randomTopic.label : topic;

    if (userId) {
      hideModal('join-queue-modal');
      showNotification(`Room created: (${finalBattleMode} - ${displayTopic})`, 'success');
      navigate("/waitingpage2", {
  state: {
    mode: finalBattleMode,
    topic: finalTopic,
  },
  replace: true, // <- this replaces the current page in history
});

    } else {
      console.log("Missing userId", { userId });
      showNotification('Please enter a valid Room ID', 'error');
    }
  };

  const handleModeSelect = (value) => {
    console.log('Mode clicked:', value); // Debug: Check if click fires
    setBattleMode(value);
    console.log('Battle mode updated to:', value); // Debug: Check state update
  };

  return (
    <div
      className={`modal-overlay fixed inset-0 bg-black/80 backdrop-blur-lg z-[10000] flex items-center justify-center transition-all duration-300 ${
        activeModal === 'join-queue-modal' ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => e.target.classList.contains('modal-overlay') && hideModal('join-queue-modal')}
    >
      <div
        className="modal-container join-queue-container bg-gradient-to-br from-deep-black to-slate-gray rounded-2xl border-2 border-neon-cyan backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,245,255,0.3)] max-w-xl w-[90%] max-h-[85vh] overflow-y-auto transition-transform duration-300"
        style={{ transform: activeModal === 'join-queue-modal' ? 'scale(1)' : 'scale(0.8)' }}
      >
        {/* Header */}
        <div className="modal-header flex justify-between items-center p-4 border-b border-neon-cyan/20">
          <h3 className="text-lg font-bold text-text-primary">Create Battle Room</h3>
          <button
            className="close-modal w-9 h-9 rounded-full bg-flame-red/20 text-flame-red flex items-center justify-center transition-all hover:bg-flame-red hover:text-text-primary hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              hideModal('join-queue-modal');
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-content p-4">
          {/* Battle Mode */}
          <div className="input-group mb-4">
            <label className="block mb-2 font-semibold text-text-primary">Battle Mode</label>
            <div className="mode-selector flex flex-col gap-2" role="radiogroup" aria-label="Battle Mode">
              {[
                { id: 'mode-dsa', value: 'dsa', label: 'Data Structures & Algorithms', icon: faTree },
                { id: 'mode-cp', value: 'cp', label: 'Competitive Programming', icon: faCode },
              ].map((mode) => (
                <label key={mode.id} htmlFor={mode.id} className="cursor-pointer block">
                  <div
                    id={mode.id}
                    role="radio"
                    aria-checked={battleMode === mode.value}
                    tabIndex={battleMode === mode.value ? 0 : -1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeSelect(mode.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleModeSelect(mode.value);
                      }
                    }}
                    className={`mode-option flex items-center gap-3 p-3 border-2 border-neon-cyan/30 rounded-xl transition-all bg-slate-gray/30 hover:border-neon-cyan hover:bg-neon-cyan/10 ${
                      battleMode === mode.value ? 'border-neon-cyan bg-neon-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.2)]' : ''
                    }`}
                  >
                    <FontAwesomeIcon icon={mode.icon} className="text-neon-cyan text-md" />
                    <span>{mode.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div className="input-group mb-4">
            <label className="block mb-2 font-semibold text-text-primary">Topic Selection</label>
            <div className="topic-selector relative">
              <select
                id="topic-select" // If duplicate elsewhere, change to something like `id={`topic-select-${activeModal}`}`
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={!battleMode}
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
              onClick={(e) => {
                e.stopPropagation();
                hideModal('join-queue-modal');
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-5 py-2 bg-gradient-dashboard text-text-primary rounded-xl font-semibold flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,245,255,0.4)]"
              onClick={(e) => {
                e.stopPropagation();
                handleCreate();
              }}
              disabled={!battleMode} // Optional: Prevent create if no mode selected
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

export default MatchModal;