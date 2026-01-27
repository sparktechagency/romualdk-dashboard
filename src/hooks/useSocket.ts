import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current?.id);
      });

      socketRef.current.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("⚠️ Socket error:", err.message);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return socketRef;
};
