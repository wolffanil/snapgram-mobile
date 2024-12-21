import { useToast } from "@/hooks/useToast";
import { useSocketAuth } from "@/providers/secketAuth/SocketAuthProvider";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { UseFormReset, UseFormSetError } from "react-hook-form";

export const useForgot = (
  setIsChangeForm: Dispatch<SetStateAction<boolean>>,
  setError: UseFormSetError<IResetPasswordForm>,
  reset: UseFormReset<IResetPasswordForm>
) => {
  const { handleShowToast } = useToast();
  const { handleResetPasswordToSocket } = useSocketAuth();
  const [openIsFormReset, setOpenIsFormReset] = useState(false);

  const { mutate: sendForgotPassword, isPending: isSendingForgotPassword } =
    useMutation({
      mutationKey: ["forgot-password"],
      mutationFn: (data: IResetPasswordForm) =>
        AuthService.forgotPassword({
          email: data.email,
        }),
      onSuccess: () => {
        handleShowToast({ type: "info", text1: "Код отправлен на почту" });
        setOpenIsFormReset(true);
      },
      onError: (error: string) => {
        handleShowToast({ type: "error", text1: getErrorMessage(error) });
      },
    });

  const { mutate: resetPassword, isPending: isResetingPassword } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: IResetPasswordForm) =>
      AuthService.resetPassword({
        code: data.code,
        newPassword: data.newPassword,
      }),
    onSuccess: (data) => {
      handleShowToast({ type: "success", text1: "Пароль успешно изменён" });
      handleResetPasswordToSocket(data.userId);
      setOpenIsFormReset(false);
      setIsChangeForm(false);
      reset();
    },
    onError: (error: string) => {
      handleShowToast({ type: "error", text1: getErrorMessage(error) });
    },
  });

  const onSubmit = async (data: IResetPasswordForm) => {
    if (openIsFormReset && data.newPassword?.length < 8) {
      setError("newPassword", {
        message: "Пароль должен быть минимум 8 символов",
      });
      return;
    }

    if (openIsFormReset) {
      resetPassword(data);
    } else {
      sendForgotPassword(data);
    }
  };

  const isLoading = isResetingPassword || isSendingForgotPassword;

  return useMemo(
    () => ({
      onSubmit,
      isLoading,
      openIsFormReset,
      setOpenIsFormReset,
    }),
    [onSubmit, openIsFormReset, isLoading]
  );
};
