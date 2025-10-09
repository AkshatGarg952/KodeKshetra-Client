import { io } from "socket.io-client";

let socket = null;

const establishSocketConnection = () => {
  const userId = sessionStorage.getItem("userId");
  
  if (!userId) {
    console.error("User ID not found in sessionStorage");
    return socket;
  }
  
  if (socket && socket.connected) {
    console.log("Socket already connected");
    return socket;
  }
  
  socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket"],
    query: {
      userId: userId,
    },
  });

  window.socket = socket;
  
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });
  
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
  
  return socket;
};

// AUTO-RECONNECT: Check if user is already logged in on page reload
if (typeof window !== 'undefined') {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    console.log("User already logged in, re-establishing socket connection...");
    establishSocketConnection();
  }
}

export { socket, establishSocketConnection };
