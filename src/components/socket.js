import { io } from "socket.io-client";
import { SERVER_URL } from "../config.js";

let socket = null;

const establishSocketConnection = () => {
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    return socket;
  }

  if (socket && socket.connected) {
    return socket;
  }

  socket = io(SERVER_URL, {
    reconnection: true,
    transports: ["websocket"],
    query: {
      userId: userId,
    },
  });

  window.socket = socket;

  return socket;
};

if (typeof window !== 'undefined') {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    establishSocketConnection();
  }
}

export { socket, establishSocketConnection };
