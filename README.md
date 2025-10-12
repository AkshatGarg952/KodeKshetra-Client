
---

## 💻 **README for `KodeKshetra-Client`**

Save this as:  
📄 `KodeKshetra-Client/README.md`

```markdown
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
It’s designed with performance, interactivity, and gamification in mind — featuring badges, leaderboards, heatmaps, and beautiful animations.

---

## 💎 Features

- ⚔️ Real-time 1v1 Coding Battles  
- 💻 Built-in Code Editor (Judge0 backend)  
- 🧠 AI-integrated test evaluation (via Hidden Forces service)  
- 🏅 Badge & XP visualization  
- 📊 Leaderboards (24-hour & 7-day)  
- 🔥 Heatmap for 90-day activity  
- 👤 Dashboard with streaks, stats, and profile  
- 🎨 Animated UI using Framer Motion  
- ⚙️ Responsive & fast (Vite + TailwindCSS)

---

## 🏗️ Folder Structure

KodeKshetra-Client/
│
├── src/
│ ├── components/
│ │ ├── BattlePage/
│ │ ├── Dashboard/
│ │ ├── Landpage/
│ │ ├── Leaderboard/
│ │ └── common/
│ ├── context/
│ │ ├── NotificationContext.jsx
│ │ └── ProblemContext.jsx
│ ├── socket.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── public/
├── package.json
└── tailwind.config.js


---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/AkshatGarg952/KodeKshetra-Client.git
cd KodeKshetra-Client

# Install dependencies
npm install

# Create .env file
VITE_SERVER_URL=https://kodekshetra-server.onrender.com

# Start the app
npm run dev

🧱 Tech Stack

Frontend: React.js + Vite

Styling: TailwindCSS + Framer Motion

Realtime: Socket.io-client

State Management: React Context API

Deployment: Vercel

| Landing Page                                    | Battle Arena                                   | Dashboard                                         | Leaderboard                                         |
| ----------------------------------------------- | ---------------------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| ![Landing](https://via.placeholder.com/250x140) | ![Battle](https://via.placeholder.com/250x140) | ![Dashboard](https://via.placeholder.com/250x140) | ![Leaderboard](https://via.placeholder.com/250x140) |

📜 License

Licensed under the MIT License.

💡 Acknowledgements

Judge0

Vercel

TailwindCSS

React.js

Socket.io
