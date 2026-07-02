import { io } from "socket.io-client";
import { SERVER_URL } from "../config.js";

let socket = null;

const establishSocketConnection = () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  if (!userId || !token) {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    return null;
  }

  const shouldCreateNewSocket =
    !socket || socket.auth?.token !== token;

  if (shouldCreateNewSocket) {
    if (socket) {
      socket.disconnect();
    }

    socket = io(SERVER_URL, {
      reconnection: true,
      transports: ["websocket", "polling"],
      withCredentials: true,
      timeout: 20000,
      auth: {
        token,
      },
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error?.message || error);
      if (String(error?.message || "").toLowerCase().includes("authentication")) {
        socket?.disconnect();
        socket = null;
      }
    });
  } else if (!socket.connected) {
    socket.connect();
  }

  if (!socket) {
    return null;
  }

  window.socket = socket;

  if (socket.connected) {
    return socket;
  }

  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

if (typeof window !== 'undefined') {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    establishSocketConnection();
  }
}

export { socket, disconnectSocket, establishSocketConnection };
