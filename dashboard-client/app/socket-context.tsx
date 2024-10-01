"use client";
import { createContext } from "react";
import { ISocketState, useSocket } from "./use-socket";

const SocketContext = createContext<ISocketState>({
  socket: null,
  open: false,
  error: false,
});

export default function SocketProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { socket, open, error } = useSocket();

  return (
    <SocketContext.Provider value={{ socket, open, error }}>
      {children}
    </SocketContext.Provider>
  );
}
