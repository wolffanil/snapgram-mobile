import { SocketContext } from "@/providers/socket/SocketProvider";
import { useContext } from "react";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined)
    throw new Error("context was used outline a Socket Context");
  return context;
};
