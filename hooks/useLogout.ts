import { AuthService } from "../services/auth/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useSocket } from "./useSocket";

export const useLogout = () => {
  const { setUser, setIsAuth } = useAuth();
  const router = useRouter();
  const { handleLogoutFromSocket } = useSocket();

  const queryClient = useQueryClient();

  const { mutateAsync: logout, isPending: isLogoutLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      handleLogoutFromSocket();
      setUser(null);
      setIsAuth(false);
      queryClient.removeQueries();
      router.replace("/(auth)/signin");
    },
  });

  return useMemo(
    () => ({
      logout,
      isLogoutLoading,
    }),
    [logout, isLogoutLoading]
  );
};
