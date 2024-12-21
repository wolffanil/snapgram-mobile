import { UseFormReset, UseFormSetError } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useRouter } from "expo-router";
import { useToast } from "@/hooks/useToast";
import { usePhoto } from "@/hooks/usePhoto";
import { PostService } from "@/services/post.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { getErrorMessage } from "@/services/api/getErrorMessage";

export const usePost = (
  action: "Create" | "Update",
  reset: UseFormReset<IEditPost>,
  setError: UseFormSetError<IEditPost>,
  _id?: string
) => {
  const { handleShowToast } = useToast();
  const router = useRouter();
  const { uploadPhoto, deletePhoto } = usePhoto("post");

  const queryClient = useQueryClient();

  const { mutate: updatePost, isPending: isUpdatingPost } = useMutation({
    mutationKey: ["edit post"],
    mutationFn: (data: IEditPost) => PostService.update(_id || "", data),
    onSuccess: (post) => {
      reset();
      handleShowToast({
        type: "success",
        text1: "Пост успешно обновлён",
      });

      queryClient.setQueryData(
        [QUERY_KEYS.GET_POST_BY_ID, _id],
        (oldPost: IPost) =>
          ({
            ...oldPost,
            tags: post.tags,
            imageUrl: post.imageUrl,
            caption: post.caption,
            location: post.location,
            updatedAt: post.updatedAt,
          } as IPost)
      );
      router.replace(`/(tabs)/posts/${_id}`);
    },
    onError: (error: string) => {
      handleShowToast({
        type: "error",
        text1: getErrorMessage(error),
      });
    },
  });

  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationKey: ["create post"],
    mutationFn: (data: IEditPost) => PostService.create(data),
    onSuccess: (post) => {
      reset();
      handleShowToast({
        type: "success",
        text1: "Пост успешно создан",
      });
      router.replace(`/(tabs)/posts/${post?._id}`);
    },
  });

  const onSubmit = async (data: IEditPost & { file: File[] }) => {
    if (data?.file.length < 1 && action === "Create") {
      setError("file", { message: "Фото обязательно" });
      return;
    }

    //@ts-ignore
    const tags = data.tags?.replace(/ /g, "").split(",") || [];

    if (action === "Create") {
      const imageUrl = await uploadPhoto(data.file);
      if (!imageUrl) {
        handleShowToast({
          type: "error",
          text1: "Что-то пошло не так",
        });
        return;
      }
      createPost({ ...data, imageUrl, tags });
    } else if (action === "Update") {
      if (!_id) return;

      const hasFileToUpdate = data.file.length > 0;

      let imageUrl = data.imageUrl;

      if (hasFileToUpdate) {
        imageUrl = (await uploadPhoto(data.file)) ?? "";

        if (!imageUrl) {
          handleShowToast({
            type: "error",
            text1: "Что-то пошло не так",
          });
          return;
        }

        // deletePhoto(imageUrl);
      }
      updatePost({ ...data, imageUrl, tags });
    } else return;

    reset();
  };

  return useMemo(
    () => ({
      onSubmit,
      isLoading: isCreatingPost || isUpdatingPost,
    }),
    [isCreatingPost, isUpdatingPost, onSubmit]
  );
};
