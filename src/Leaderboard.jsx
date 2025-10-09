import React, { useState, useEffect } from 'react';
import Navbar from './components/Leaderboard/Navbar';
import CustomCursor from './components/Leaderboard/CustomCursor';
import LeaderboardHeader from './components/Leaderboard/LeaderboardHeader';
import LeaderboardTable from './components/Leaderboard/LeaderboardTable';
import Footer from './components/Leaderboard/Footer';
import Notification from './components/Leaderboard/Notification';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardState, setLeaderboardState] = useState(() => {
    const saved = sessionStorage.getItem("leaderboardState");
    return saved
      ? JSON.parse(saved)
      : {
          currentPage: 1,
          currentFilter: 1,
          playersPerPage: 10,
          isLoading: false,
          leaderboardData: [], 
          isNextPage: false,
        };
  });
  
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3400);
  };
    
    useEffect(() => {
    sessionStorage.setItem("leaderboardState", JSON.stringify(leaderboardState));
  }, [leaderboardState]);
  
  useEffect(() => {
  return () => {
    sessionStorage.removeItem("leaderboardState");
  };
}, []);

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar showNotification={showNotification} />
      <main className="min-h-screen pt-32 pb-16 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.08)_0%,transparent_50%),radial-gradient(circle_at_50%_10%,rgba(236,72,153,0.06)_0%,transparent_50%),var(--void-black)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <LeaderboardHeader
            leaderboardState={leaderboardState}
            setLeaderboardState={setLeaderboardState}
          />
          <LeaderboardTable
            leaderboardState={leaderboardState}
            setLeaderboardState={setLeaderboardState}
            showNotification={showNotification}
          />
        </div>
      </main>
      <Footer />
      {notifications.map((note) => (
        <Notification key={note.id} message={note.message} type={note.type} />
      ))}
    </div>
  );
};

export default Leaderboard;