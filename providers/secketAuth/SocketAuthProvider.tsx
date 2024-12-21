import { ISocketAuth } from "./socket-provide.interface";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { SOCKET_AUTH_KEYS, SOCKET_KEYS } from "@/shared/enums/socketKeys";

const SocketAuthContext = createContext({} as ISocketAuth);

import { io } from "socket.io-client";

let socket: any;
const ENPOINT = process.env.EXPO_PUBLIC_SOCKET_URL;

const SocketAuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    socket = io(ENPOINT);
  }, []);

  const handleResetPasswordToSocket = useCallback((userId: string) => {
    socket.emit(SOCKET_AUTH_KEYS.RESET_PASSWORD, userId);
  }, []);

  const handleTrySignInToSocket = useCallback((email: string) => {
    if (!socket || !email) return;

    socket.emit(SOCKET_AUTH_KEYS.TRY_SIGN_IN, email);
  }, []);

  const handleSignIn = useCallback((userId: string) => {
    if (!socket) return;

    socket.emit(SOCKET_KEYS.SIGNIN, userId);
  }, []);

  return (
    <SocketAuthContext.Provider
      value={{
        handleResetPasswordToSocket,
        handleTrySignInToSocket,
        handleSignIn,
      }}
    >
      {children}
    </SocketAuthContext.Provider>
  );
};

const useSocketAuth = () => {
  const context = useContext(SocketAuthContext);
  if (!context) throw new Error("socket auth was used outside provider");
  return context;
};

export { useSocketAuth };

export default SocketAuthProvider;
