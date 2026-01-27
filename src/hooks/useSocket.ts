// src/lib/socket.ts
import { io, type Socket } from 'socket.io-client';  // ← "type" keyword is key here

import { imageUrl } from '../redux/base/baseAPI';

let socketInstance: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (socketInstance) {
    return socketInstance;
  }

  socketInstance = io(imageUrl, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    autoConnect: true,
    // withCredentials: true,     // ← add only if your server uses cookies / credentials
    // auth: { token: getToken() }, // ← if you have JWT or similar
  });

  socketInstance.on('connect', () => {
    console.log('Socket connected:', socketInstance?.id);
  });

  socketInstance.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socketInstance.on('connect_error', (err) => {
    console.error('Socket connection error:', err);
  });

  return socketInstance;
};

export const getSocket = (): Socket => {
  if (!socketInstance) {
    initializeSocket();
  }
  return socketInstance!;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};