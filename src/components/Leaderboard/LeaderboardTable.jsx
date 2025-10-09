import React, { useEffect } from "react";
import LeaderboardEntry from "./LeaderboardEntry";
import Pagination from "./Pagination";

const LeaderboardTable = ({ leaderboardState, setLeaderboardState, showNotification }) => {
  const { currentPage, currentFilter, isLoading, leaderboardData, isNextPage } =
    leaderboardState;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLeaderboardState((prev) => ({ ...prev, isLoading: true }));

        const res = await fetch(
          `https://kodekshetra-server.onrender.com/leaderboard/${currentFilter}/${currentPage}`
        );
        const data = await res.json();
        console.log("Fetched leaderboard:", data);

        setLeaderboardState((prev) => ({
          ...prev,
          isLoading: false,
          leaderboardData: data.data || [],
          isNextPage: data.isNextPage || false,
        }));
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        showNotification("Failed to load leaderboard data.", "error");

        setLeaderboardState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchLeaderboard();
  }, [currentFilter, currentPage, setLeaderboardState]);

  const showLoadingEffect = () =>
    Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] md:grid-cols-[60px_1fr_120px_120px] lg:grid-cols-[80px_1fr_150px_150px] gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4 md:p-6 mb-2 bg-slate-gray/40 rounded-2xl animate-skeleton-pulse"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 bg-[linear-gradient(90deg,rgba(6,182,212,0.1)_0px,rgba(6,182,212,0.3)_40px,rgba(6,182,212,0.1)_80px)] bg-[length:200px_100%] rounded-lg animate-skeleton-shimmer"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    ));

  return (
    <div className="relative bg-[linear-gradient(145deg,rgba(13,13,13,0.95),rgba(30,41,59,0.9))] rounded-3xl border-2 border-[rgba(124,58,237,0.3)] backdrop-blur-3xl mb-16 shadow-[0_20px_60px_rgba(124,58,237,0.2)] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(6,182,212,0.08)_100%),linear-gradient(45deg,transparent_98%,rgba(124,58,237,0.06)_100%)] bg-[length:120px_120px,80px_80px] animate-pattern-move z-0" />
      <div className="relative z-10">
        {/* Header */}
        <div className="grid grid-cols-[40px_1fr_80px_80px] sm:grid-cols-[50px_1fr_100px_100px] md:grid-cols-[60px_1fr_120px_120px] lg:grid-cols-[80px_1fr_150px_150px] gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4 md:p-8 border-b-2 border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.1)] font-bold text-xs sm:text-sm text-text-accent uppercase tracking-wider">
          <div>Rank</div>
          <div>Player</div>
          <div>Battle Points</div>
          <div>Current Streak</div>
        </div>

        {/* Body */}
        <div className="p-2 sm:p-4 min-h-[600px]">
          {isLoading ? (
            showLoadingEffect()
          ) : leaderboardData.length === 0 ? (
            <div className="text-center py-8 text-text-secondary text-sm sm:text-base">
              No data available for this page.
            </div>
          ) : (
            leaderboardData.map((player, index) => (
              <LeaderboardEntry
                key={player.rank}
                player={player}
                animationIndex={index}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          leaderboardState={leaderboardState}
          setLeaderboardState={setLeaderboardState}
          isNextPage={isNextPage}
        />
      </div>
    </div>
  );
};

export default LeaderboardTable;
