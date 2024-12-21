import { usePhoto } from "@/hooks/usePhoto";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/providers/auth/AuthProvider";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { UserService } from "@/services/user.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { SubmitHandler, UseFormReset, UseFormSetValue } from "react-hook-form";

export const useUpdateProfile = (
  setValue: UseFormSetValue<IEditUser>,
  reset: UseFormReset<IEditUser>
) => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleShowToast } = useToast();

  const { uploadPhoto, deletePhoto } = usePhoto("profile");

  useEffect(() => {
    if (!user) return;
    setValue("name", user?.name);
    setValue("nick", user?.nick ? user.nick : "");
    setValue("bio", user?.bio ? user.bio : "");
    setValue("email", user.email);
    setValue("file", []);
  }, [user]);

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationKey: ["update profile"],
      mutationFn: (data: IEditUser) => UserService.update(data),
      onError: (error: string) => {
        handleShowToast({ type: "error", text1: getErrorMessage(error) });
      },
      onSuccess: (data) => {
        handleShowToast({ type: "success", text1: "Профиль обновлён" });
        queryClient.setQueryData(
          [QUERY_KEYS.GET_USER_BY_ID, user?._id],
          (oldUser: IUser) =>
            ({
              ...oldUser,
              ...data,
            } as IUser)
        );
        setUser(data);
      },
    });

  const onSubmit: SubmitHandler<IEditUser> = async (data) => {
    // loadingToast("Обновление...");

    const hasFileToUpdate = data?.file?.length > 0;

    let imageUrl = data.imageUrl;

    if (hasFileToUpdate) {
      imageUrl = (await uploadPhoto(data.file)) || "";

      if (!imageUrl) {
        handleShowToast({ type: "error", text1: "Что-то пошло нет так" });
        return;
      }

      //   try {
      //     if (imageUrl.split("/").includes("default.svg")) return imageUrl;
      //     deletePhoto(imageUrl);
      //   } catch (error) {}
    }

    const updatedUser = await updateProfile({ ...data, imageUrl });
    if (!updatedUser) return;
    reset();

    router.push(`/(tabs)/profile/${user?._id}`);
  };

  return useMemo(
    () => ({
      isUpdatingProfile,
      onSubmit,
    }),
    [isUpdatingProfile, onSubmit]
  );
};
