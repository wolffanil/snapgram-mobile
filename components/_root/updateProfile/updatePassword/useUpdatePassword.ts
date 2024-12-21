import { useSocket } from "@/hooks/useSocket";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/providers/auth/AuthProvider";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { UserService } from "@/services/user.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "mutative";
import { useMemo } from "react";
import { UseFormReset } from "react-hook-form";
import { useDevices } from "../../profile/devices/useDevices";

export const useUpdatePassword = (reset: UseFormReset<IUpdatePassword>) => {
  const { sessionId } = useAuth();
  const queryClient = useQueryClient();
  const { handleShowToast } = useToast();
  const { handleUpdataPasswordToSocket } = useSocket();
  const { devices } = useDevices();

  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation(
    {
      mutationKey: ["update-password"],
      mutationFn: (data: IUpdatePassword) => UserService.updatePassword(data),
      onSuccess: async () => {
        handleShowToast({ type: "success", text1: "Пароль обновлён" });
        reset();

        if (!devices) return;

        queryClient.setQueryData([QUERY_KEYS.GET_MY_TOKENS], () => {
          return create(devices, (draft) => {
            return draft.filter((token: IToken) => token._id === sessionId);
          });
        });

        const sessionIds = devices.map((t) => t._id);

        handleUpdataPasswordToSocket(sessionIds);
      },
      onError: (error: string) => {
        handleShowToast({ type: "error", text1: getErrorMessage(error) });
      },
    }
  );

  const onSubmit = (data: IUpdatePassword) => {
    //   loadingToast("Обновлнение...");

    updatePassword({ ...data, sessionId });
  };

  return useMemo(
    () => ({
      onSubmit,
      isUpdatingPassword,
    }),
    [isUpdatingPassword, onSubmit]
  );
};
