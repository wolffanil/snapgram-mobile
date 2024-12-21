import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { AuthService } from "@/services/auth/auth.service";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { useAuth } from "@/providers/auth/AuthProvider";
import { router } from "expo-router";

export const useRegister = (reset: UseFormReset<IRegister>) => {
  const [openIsFormCode, setIsOpenFormCode] = useState(false);
  const { handleShowToast } = useToast();
  const { setUser, setSessionId } = useAuth();

  const { mutate: register, isPending: isRegisterLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IRegister) => AuthService.register(data),
    onSuccess: (data) => {
      if (!openIsFormCode) {
        handleShowToast({ type: "info", text1: "Код отправлен на почту" });
        setIsOpenFormCode(true);
        return;
      }

      reset();
      handleShowToast({
        type: "success",
        text1: "Вы успешно зарегистрировались",
      });
      setUser(data.userData);
      setSessionId(data.session.id);

      router.replace("/(tabs)");
    },
    onError: (error: string) => {
      handleShowToast({ type: "error", text1: getErrorMessage(error) });
    },
  });

  const onRegister = async (data: IRegister) => {
    if (openIsFormCode && !data.code?.length) return;
    register({ ...data });
  };

  return useMemo(
    () => ({
      onRegister,
      isRegisterLoading,
      openIsFormCode,
    }),
    [isRegisterLoading, onRegister, openIsFormCode]
  );
};
