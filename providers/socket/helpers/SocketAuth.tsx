import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/providers/auth/AuthProvider";
import { SOCKET_AUTH_KEYS, SOCKET_KEYS } from "@/shared/enums/socketKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

export const SocketAuthHelper = (socket: any) => {
  const { deleteUser } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleShowToast } = useToast();

  /// on ResetPassword
  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_AUTH_KEYS.RESET_PASSWORD, () => {
      deleteUser();
      queryClient.clear();
      router.replace("/(auth)/signin");
    });

    return () => {
      socket.off(SOCKET_AUTH_KEYS.RESET_PASSWORD);
    };
  }, [socket]);

  // on try sign in

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_AUTH_KEYS.TRY_SIGN_IN_YOUR_ACCOUNT, () => {
      handleShowToast({ type: "info", text1: "❗ Попытка входа в аккаунт" });
    });

    return () => {
      socket.off(SOCKET_AUTH_KEYS.TRY_SIGN_IN_YOUR_ACCOUNT);
    };
  }, [socket]);

  const handleSendTokenQr = useCallback(
    (token: string, code: string) => {
      if (!socket || !token) return;

      socket.emit(SOCKET_KEYS.SCAN_QR, { key: code, token });
    },
    [socket]
  );

  return { handleSendTokenQr };
};
