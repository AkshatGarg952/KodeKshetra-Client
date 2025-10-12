# ⚔️ KodeKshetra (Client)

> 🎮 Frontend for the real-time coding battle platform — built with **React.js**, **TailwindCSS**, and **Socket.io**.

[![React](https://img.shields.io/badge/Frontend-React.js-blue?style=flat-square)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?style=flat-square)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-black?style=flat-square)](https://socket.io/)
[![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?style=flat-square)](https://vercel.com/)
[![KodeKshetra Server](https://img.shields.io/badge/Backend-KodeKshetra%20Server-brightgreen?style=flat-square)](https://github.com/AkshatGarg952/KodeKshetra-Server)

---

## 🌟 Overview

The **KodeKshetra Client** provides a seamless interface for users to battle friends or random opponents in **real-time DSA/CP duels**.  
It's designed with performance, interactivity, and gamification in mind — featuring badges, leaderboards, heatmaps, and beautiful animations.

---

## 💎 Features

- ⚔️ **Real-time 1v1 Coding Battles** — Instant matchmaking and live duels  
- 💻 **Built-in Code Editor** — Powered by Judge0 backend  
- 🧠 **AI-integrated Test Evaluation** — Via Hidden Forces service  
- 🏅 **Badge & XP Visualization** — Track your achievements  
- 📊 **Leaderboards** — Rankings for 24-hour & 7-day periods  
- 🔥 **90-Day Heatmap** — Visual activity tracker  
- 👤 **Dashboard** — View streaks, stats, and profile  
- 🎨 **Animated UI** — Smooth transitions with Framer Motion  
- ⚙️ **Responsive & Fast** — Built with Vite + TailwindCSS

---

## 🏗️ Folder Structure

```
KodeKshetra-Client/
│
├── src/
│   ├── components/
│   │   ├── BattlePage/
│   │   ├── Dashboard/
│   │   ├── Landpage/
│   │   ├── Leaderboard/
│   │   └── common/
│   ├── context/
│   │   ├── NotificationContext.jsx
│   │   └── ProblemContext.jsx
│   ├── socket.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/AkshatGarg952/KodeKshetra-Client.git
cd KodeKshetra-Client

# Install dependencies
npm install

# Create .env file with the following variable
VITE_SERVER_URL=https://kodekshetra-server.onrender.com

# Start the app
npm run dev
```

---

## 🧱 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js + Vite |
| **Styling** | TailwindCSS + Framer Motion |
| **Realtime** | Socket.io-client |
| **State Management** | React Context API |
| **Deployment** | Vercel |

---

## 📸 Screenshots

| Landing Page | Battle Arena | Dashboard | Leaderboard |
|:------------:|:------------:|:---------:|:-----------:|
| ![Landing](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255700/Screenshot_2025-10-12_130014_qg3et8.png) | ![Battle](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255745/Screenshot_2025-10-12_132438_gg7omj.png) | ![Dashboard](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255946/Screenshot_2025-10-12_132846_vo5bjv.png) | ![Leaderboard](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255937/Screenshot_2025-10-12_132832_iijq3e.png) |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit and push
4. Open a Pull Request 🚀

---

## 📜 License

Licensed under the **MIT License**.

---

## 💡 Acknowledgements

- [Judge0](https://judge0.com/)
- [Vercel](https://vercel.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React.js](https://react.dev/)
- [Socket.io](https://socket.io/)
