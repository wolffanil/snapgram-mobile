import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

export const useResetCode = (dataUser: IResetCode) => {
  const { handleShowToast } = useToast();
  const { mutate: resetCode, isPending } = useMutation({
    mutationKey: ["reset-code"],
    mutationFn: () => AuthService.resetCode(dataUser),
    onSuccess: () => {
      handleShowToast({ type: "info", text1: "Код отправлен" });
    },
    onError: (error: string) => {
      handleShowToast({
        type: "error",
        text1: "Ошибка кода",
        text2: getErrorMessage(error),
      });
    },
  });

  return useMemo(
    () => ({
      resetCode,
      isPending,
    }),
    [resetCode, isPending]
  );
};
