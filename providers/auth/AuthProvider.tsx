import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IContext,
  TypeChatState,
  TypeUserState,
} from "./auth-provider.interface";
import { deleteTokens, getAccessToken } from "@/services/auth/auth.helper";
import { getNewTokens } from "@/services/api/helper.api";
import * as SplashScreen from "expo-splash-screen";
import { resetAndNavigate } from "@/utils/LibraryHelpers";

let ignore = SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext({} as IContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TypeUserState>({} as IUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [selectedChat, setSelectedChat] = useState<TypeChatState>({} as IChat);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const checkAuthCheck = async () => {
      try {
        setIsLoading(true);
        const accessToken = await getAccessToken();

        if (accessToken) {
          const userData = await getNewTokens();
          setUser(userData?.data?.userData || null);
          setSessionId(userData?.data?.session?.id || "");
          setIsAuth(true);
          resetAndNavigate("/(tabs)");
        } else {
          resetAndNavigate("/(auth)/signin");
        }
      } catch (error) {
        resetAndNavigate("/(auth)/signin");
        console.log(error);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    };

    if (isAuth) return;

    let check = checkAuthCheck();
  }, []);

  const deleteUser = async () => {
    setUser(null);
    setSelectedChat(null);
    setSessionId("");
    setIsAuth(false);
    await deleteTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isAuth,
        setIsAuth,
        selectedChat,
        setSelectedChat,
        setSessionId,
        sessionId,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
