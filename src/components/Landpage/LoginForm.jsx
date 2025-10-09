import React, { forwardRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { establishSocketConnection } from "../socket.js";
import LoadingSpinner from './LoadingSpinner';

const LoginForm = forwardRef(({ setShowLogin, setShowRegister }, ref) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://kodekshetra-server.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful:");
        sessionStorage.setItem("userId", data.oldUser._id);
        sessionStorage.setItem("token", data.token);
        establishSocketConnection();
        navigate("/leaderboard", { replace: true });
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex items-center justify-center px-4">
      <div
        ref={ref}
        className="form-container bg-[linear-gradient(145deg,rgba(13,13,13,0.98),rgba(26,26,26,0.95))] rounded-2xl p-8 border-2 border-electric-blue shadow-[0_0_30px_rgba(0,191,255,0.4)] w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-2 border-red-500 flex items-center justify-center group hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-black text-text-primary mb-6 text-center font-space-grotesk">
          Login to CodeVersus
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-jetbrains-mono text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-dark-gray text-text-primary rounded-lg px-4 py-3 border-2 border-electric-blue focus:outline-none input-glow font-jetbrains-mono disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-jetbrains-mono text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-dark-gray text-text-primary rounded-lg px-4 py-3 border-2 border-electric-blue focus:outline-none input-glow font-jetbrains-mono disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 rounded-lg font-bold text-lg text-white bg-gradient-fire shadow-[0_8px_25px_rgba(255,69,0,0.4)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,215,0,0.6)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 flex items-center justify-center min-h-[3rem]"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <LoadingSpinner />
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className="text-center text-sm text-text-secondary font-jetbrains-mono mt-4">
          Don't have an account?{' '}
          <button
            onClick={handleSwitchToRegister}
            disabled={isLoading}
            className="text-cyber-cyan hover:text-neon-green transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
});

export default LoginForm;
