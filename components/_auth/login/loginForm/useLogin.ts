import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useSocketAuth } from "@/providers/secketAuth/SocketAuthProvider";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { UseFormReset } from "react-hook-form";
export const useLogin = (reset: UseFormReset<ILogin>) => {
  const [openIsFormCode, setIsOpenFormCode] = useState(false);
  const { handleShowToast } = useToast();
  const { setUser, setSessionId } = useAuth();

  const { handleTrySignInToSocket, handleSignIn } = useSocketAuth();

  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILogin) => AuthService.login(data),
    onSuccess: async (data) => {
      if (!openIsFormCode) {
        handleShowToast({
          type: "info",
          text1: "Код отправлен на почту",
          text2: "Проверьте почту",
        });
        setIsOpenFormCode(true);
        return;
      }

      handleSignIn(data.userData._id);
      // await new Promise((res) => setTimeout(res, 1000));

      reset();
      handleShowToast({
        type: "success",
        text1: `Добро пожаловать обратно ${data.userData.name}`,
      });
      setUser(data.userData);
      setSessionId(data.session.id);
      setIsOpenFormCode(false);
      router.replace("/(tabs)");
    },
    onError: (error: string, dataForm) => {
      handleShowToast({
        type: "error",
        text1: "Ошибка",
        text2: getErrorMessage(error),
      });
      handleTrySignInToSocket(dataForm.email);
    },
  });

  const onLogin = async (data: ILogin) => {
    if (openIsFormCode && !data.code?.length) return;

    login({ ...data });
  };

  return useMemo(
    () => ({
      onLogin,
      isLoginLoading,
      openIsFormCode,
      setIsOpenFormCode,
    }),
    [isLoginLoading, onLogin, openIsFormCode]
  );
};
