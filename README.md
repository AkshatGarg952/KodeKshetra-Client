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
- 💻 **Built-in Code Editor** — Syntax highlighting with Prism.js
- 🧠 **AI-integrated Test Evaluation** — Via Hidden Forces service  
- 🏅 **Badge & XP Visualization** — Track your achievements  
- 📊 **Leaderboards** — Rankings for 24-hour & 7-day periods  
- 🔥 **90-Day Heatmap** — Visual activity tracker  
- 👤 **User Dashboard** — View streaks, stats, and profile  
- 🎨 **Animated UI** — Smooth transitions and interactive elements
- ⚙️ **Responsive & Fast** — Built with Vite + TailwindCSS
- 🔌 **Real-time Communication** — Socket.io for live updates

---

## 🏗️ Project Structure

```
KodeKshetra-Client/
│
├── src/
│   ├── components/
│   │   ├── BattlePage/         # Battle arena components
│   │   ├── Dashboard/          # User dashboard components
│   │   ├── Landpage/           # Landing page components
│   │   │   └── NeuralNetwork.jsx
│   │   ├── Leaderboard/        # Leaderboard components
│   │   └── common/             # Reusable UI components
│   │
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Application entry point
│   ├── index.css               # Global styles
│   │
│   ├── BattlePage.jsx          # Battle page container
│   ├── BattlePage.css          # Battle page styles
│   ├── Dashboard.jsx           # Dashboard container
│   ├── Dashboard.css           # Dashboard styles
│   ├── Landpage.jsx            # Landing page container
│   ├── landpage.css            # Landing page styles
│   ├── Leaderboard.jsx         # Leaderboard container
│   ├── Leaderboard.css         # Leaderboard styles
│   │
│   ├── WaitingPage1.jsx        # Matchmaking waiting screen
│   ├── WaitingPage2.jsx        # Battle room waiting screen
│   │
│   ├── NotificationContext.jsx # Global notification system
│   ├── ProblemContext.jsx      # Problem state management
│   │
│   ├── badgesData.js           # Badge definitions and metadata
│   ├── problemData.js          # Sample problem data
│   └── vite-env.d.ts           # Vite TypeScript definitions
│
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration (40KB custom config)
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint configuration
├── vercel.json                 # Vercel deployment config
├── .env                        # Environment variables
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- KodeKshetra Server running (backend)

### Steps

```bash
# Clone repository
git clone https://github.com/AkshatGarg952/KodeKshetra-Client.git
cd KodeKshetra-Client

# Install dependencies
npm install

# Create .env file
echo "VITE_SERVER_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SERVER_URL=http://localhost:5000
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_SERVER_URL` | Backend server URL | - | **Yes** |

**Note**: All environment variables in Vite must be prefixed with `VITE_` to be exposed to the client.

### Deployment Configuration

The `vercel.json` file configures deployment settings for Vercel:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This enables client-side routing for React Router.

---

## 🎯 Key Components

### Context Providers

#### NotificationContext
Manages global notifications and alerts throughout the application.

```javascript
// Usage
import { useNotification } from './NotificationContext';

const { showNotification } = useNotification();
showNotification('Battle started!', 'success');
```

#### ProblemContext
Manages problem state and data across components.

```javascript
// Usage
import { useProblem } from './ProblemContext';

const { currentProblem, setProblem } = useProblem();
```

### Major Pages

#### Landing Page (`Landpage.jsx`)
- Animated neural network background
- Hero section with call-to-action
- Feature highlights
- Login/Register forms

#### Battle Page (`BattlePage.jsx`)
- Real-time code editor with syntax highlighting
- Problem description panel
- Test case runner
- Live opponent status
- Timer and submission controls

#### Dashboard (`Dashboard.jsx`)
- User statistics and XP
- Badge collection display
- 90-day activity heatmap
- Win/loss streaks
- Recent battles

#### Leaderboard (`Leaderboard.jsx`)
- Paginated rankings
- 24-hour and 7-day periods
- User search and filtering
- Rank, username, XP display

### Waiting Screens

- **WaitingPage1**: Matchmaking queue with animated loader
- **WaitingPage2**: Battle room waiting for opponent to join

---

## 🔌 Socket.io Integration

The client connects to the server via Socket.io for real-time features:

```javascript
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SERVER_URL, {
  query: { userId: user.id }
});

// Join matchmaking queue
socket.emit('joinQueue', { userId, mode: 'dsa', topic: 'arrays' });

// Listen for battle start
socket.on('battleStart', ({ question, battleId }) => {
  // Navigate to battle page
});

// Submit battle result
socket.emit('battleEnded', { battleDetails, userId, code, roomId });

// Listen for battle result
socket.on('battleResult', (status) => {
  // Show win/loss/draw
});
```

### Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `joinQueue` | Client → Server | Join matchmaking queue |
| `cancelMatchmaking` | Client → Server | Cancel matchmaking |
| `matchFound` | Server → Client | Match found, navigate to battle |
| `joinBattleRoom` | Client → Server | Join battle room |
| `battleStart` | Server → Client | Battle started with problem |
| `battleEnded` | Client → Server | Submit battle result |
| `battleResult` | Server → Client | Receive win/loss/draw status |

---

## 🎨 Styling

### TailwindCSS

The project uses a heavily customized TailwindCSS configuration (40KB) with:
- Custom color palette
- Extended spacing and sizing
- Custom animations
- Responsive breakpoints
- Form plugin integration

### Custom CSS

Additional styling in component-specific CSS files:
- `BattlePage.css` - Battle arena styles
- `Dashboard.css` - Dashboard layouts
- `Leaderboard.css` - Leaderboard tables
- `landpage.css` - Landing page animations (9KB)

---

## 🚀 Development Workflow

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Code Editor Integration

The battle page uses `react-simple-code-editor` with Prism.js for syntax highlighting:

```javascript
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';

<Editor
  value={code}
  onValueChange={setCode}
  highlight={code => Prism.highlight(code, Prism.languages.python, 'python')}
  padding={10}
  style={{ fontFamily: 'monospace' }}
/>
```

---

## 🧱 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js 18.3.1 + Vite 5.4.2 |
| **Styling** | TailwindCSS 3.4.17 |
| **Routing** | React Router DOM 7.8.1 |
| **Real-time** | Socket.io-client 4.8.1 |
| **Code Editor** | react-simple-code-editor 0.14.1 |
| **Syntax Highlighting** | Prism.js 1.30.0 |
| **Icons** | FontAwesome 7.0.1, Heroicons 2.2.0, Lucide React 0.344.0, React Icons 5.5.0 |
| **Forms** | @tailwindcss/forms 0.5.10 |
| **Animations** | Intersection Observer API (react-intersection-observer 9.16.0) |
| **Deployment** | Vercel |

---

## 🐛 Troubleshooting

### Common Issues

**1. Server Connection Failed**
```
Error: Socket connection refused
```
**Solution**: 
- Ensure backend server is running
- Check `VITE_SERVER_URL` in `.env`
- Verify CORS settings on server

**2. Environment Variables Not Loading**
```
import.meta.env.VITE_SERVER_URL is undefined
```
**Solution**: 
- Restart dev server after changing `.env`
- Ensure variable is prefixed with `VITE_`
- Check `.env` file is in root directory

**3. Build Errors**
```
Error: Cannot find module 'X'
```
**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. Routing Not Working After Deployment**
```
404 on page refresh
```
**Solution**: Ensure `vercel.json` has proper rewrite rules (already configured)

**5. Code Editor Not Highlighting**
```
Syntax highlighting not working
```
**Solution**: 
- Import the correct Prism language component
- Check language is supported by Prism.js
- Verify Prism CSS is imported

---

## 📸 Screenshots

| Landing Page | Battle Arena | Dashboard | Leaderboard |
|:------------:|:------------:|:---------:|:-----------:|
| ![Landing](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255700/Screenshot_2025-10-12_130014_qg3et8.png) | ![Battle](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255745/Screenshot_2025-10-12_132438_gg7omj.png) | ![Dashboard](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255946/Screenshot_2025-10-12_132846_vo5bjv.png) | ![Leaderboard](https://res.cloudinary.com/dnd6asdiw/image/upload/v1760255937/Screenshot_2025-10-12_132832_iijq3e.png) |

---

## 🔗 Related Repositories

- [KodeKshetra Server](https://github.com/AkshatGarg952/KodeKshetra-Server) - Backend microservice
- [Code-Runner](https://github.com/AkshatGarg952/Code-Runner) - Code execution service
- [HiddenForces](https://github.com/AkshatGarg952/HiddenForces) - AI test case generator

---

## 📜 License

Licensed under the **MIT License**.

---

## 💡 Acknowledgements

- [Judge0](https://judge0.com/) - Code execution engine
- [Vercel](https://vercel.com/) - Deployment platform
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [React.js](https://react.dev/) - UI library
- [Socket.io](https://socket.io/) - Real-time communication
- [Prism.js](https://prismjs.com/) - Syntax highlighting

---

## 👨‍💻 Author

**Akshat Garg**
- GitHub: [@AkshatGarg952](https://github.com/AkshatGarg952)

---

⭐ Star this repository if you find it helpful!
