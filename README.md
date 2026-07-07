# ⚔️ KodeKshetra (Client)

The frontend client for **KodeKshetra**, a real-time 1v1 coding battle platform. Built using **React.js**, **TailwindCSS**, and **Socket.io**, it allows users to compete in live coding duels, track stats, view leaderboards, and visualize coding consistency.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📸 App Preview

| Landing Page | Battle Arena | Dashboard | Leaderboard |
|:------------:|:------------:|:---------:|:-----------:|
| ![Landing](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255700/Screenshot_2025-10-12_130014_qg3et8.png) | ![Battle](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255745/Screenshot_2025-10-12_132438_gg7omj.png) | ![Dashboard](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255946/Screenshot_2025-10-12_132846_vo5bjv.png) | ![Leaderboard](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255937/Screenshot_2025-10-12_132832_iijq3e.png) |

---

## 🌟 Key Features

- **Real-Time Matchmaking**: Queue up and get matched instantly for a 1v1 duel.
- **Interactive Code Editor**: In-browser editing with syntax highlighting (Prism.js) for Python, C++, and Java.
- **Dynamic Dashboard**: View user stats, streak info, earned badges, and a GitHub-style 90-day activity heatmap.
- **Leaderboards**: Track top-performing users dynamically over 24-hour and 7-day windows.
- **Polished Animations**: Smooth neural-network backdrop on the landing page, fluid transitions, and status-based waiting views.

---

## 🛠️ Tech Stack

- **Frontend Library**: React.js (Vite bundler)
- **Styling**: TailwindCSS & custom CSS transitions
- **Routing**: React Router DOM (v7)
- **Real-Time Communication**: Socket.io-client
- **Code Highlighting**: react-simple-code-editor & Prism.js

---

## 📂 Project Structure

```
KodeKshetra-Client/
├── src/
│   ├── components/         # Sub-components (BattlePage, Dashboard, Landpage, Leaderboard)
│   ├── App.jsx             # Routes and App shell
│   ├── main.jsx            # Entry point
│   ├── index.css           # Global CSS and Tailwind directives
│   ├── ProblemContext.jsx  # Context provider for problem details
│   └── badgesData.js       # JSON details for gamification badges
├── tailwind.config.js      # Custom theme colors and extension settings
└── vercel.json             # Vercel SPA routing redirects configuration
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Running [KodeKshetra Server](file:///c:/Users/garga/OneDrive/Desktop/Kodekshetra/KodeKshetra-Server/README.md) backend

### Setup
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   VITE_SERVER_URL=http://localhost:5000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *The app will launch at `http://localhost:5173`.*

---

## ⚡ Real-Time Events (Socket.io)

| Event | Direction | Description |
|:---|:---:|:---|
| `joinQueue` | Client ──▶ Server | Enter matchmaking pool with user criteria |
| `matchFound` | Server ──▶ Client | Trigger navigation to Battle Arena |
| `battleStart` | Server ──▶ Client | Receive code problem and start countdown timer |
| `battleEnded` | Client ──▶ Server | Submit code execution results and time |
| `battleResult` | Server ──▶ Client | Receive final result status (`won`, `loss`, or `draw`) |

---

## 🔗 Related Services

- [KodeKshetra Server](file:///c:/Users/garga/OneDrive/Desktop/Kodekshetra/KodeKshetra-Server/README.md) - Main server orchestrating matchmaking, XP system, and API requests.
- [Code-Runner](file:///c:/Users/garga/OneDrive/Desktop/Kodekshetra/Code-Runner/README.md) - Code validation and Judge0 compilation microservice.
- [HiddenForces](file:///c:/Users/garga/OneDrive/Desktop/Kodekshetra/HiddenForces/README.md) - AI-powered test case generator service.
