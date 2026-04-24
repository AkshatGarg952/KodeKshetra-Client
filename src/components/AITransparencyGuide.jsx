function AITransparencyGuide({ compact = false }) {
  return (
    <div className={`rounded-2xl border border-cyan-300/20 bg-slate-950/70 ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
        <span>How AI Battle Stays Fair</span>
      </div>

      <p className={`mt-3 leading-6 text-slate-200 ${compact ? 'text-sm' : 'text-[15px]'}`}>
        We want users to clearly understand what happens behind the scenes. So the AI does not get a hidden shortcut.
        The system follows the same path for both sides as much as possible.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-sm font-semibold text-white">What stays the same</div>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
            <li>Both sides get the same problem.</li>
            <li>The AI answer is checked by the same judge.</li>
            <li>More passed test cases wins.</li>
            <li>If test counts tie, faster finish time wins.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-sm font-semibold text-white">What the system does for safety</div>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-300">
            <li>It first tries a real AI solve.</li>
            <li>If that solve looks unreliable, we use a safe backup result.</li>
            <li>This prevents random crashes or broken AI outputs from ruining your battle.</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-400/5 p-4">
        <div className="text-sm font-semibold text-white">Simple flow</div>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-cyan-100">
{`You start AI Battle
      |
      v
Same problem goes to:
  1. You
  2. AI
      |
      v
Same judge checks both sides
      |
      v
We compare scores and show the result`}
        </pre>
      </div>

      <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-400/5 p-4">
        <div className="text-sm font-semibold text-white">Simple example</div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Suppose the problem has <span className="font-semibold text-white">10 test cases</span>.
          If you pass <span className="font-semibold text-emerald-300">8</span> and the AI passes
          <span className="font-semibold text-amber-300"> 6</span>, you win.
          If both pass <span className="font-semibold text-white">8</span>, then the faster finish time wins.
        </p>
      </div>
    </div>
  );
}

export default AITransparencyGuide;
