import { io } from "socket.io-client";
import { SERVER_URL } from "../config.js";

let socket = null;

const establishSocketConnection = () => {
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    return null;
  }

  const shouldCreateNewSocket =
    !socket || socket.io?.opts?.query?.userId !== userId;

  if (shouldCreateNewSocket) {
    if (socket) {
      socket.disconnect();
    }

    socket = io(SERVER_URL, {
      reconnection: true,
      transports: ["websocket", "polling"],
      withCredentials: true,
      timeout: 20000,
      query: {
        userId,
      },
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error?.message || error);
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

if (typeof window !== 'undefined') {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    establishSocketConnection();
  }
}

export { socket, establishSocketConnection };
