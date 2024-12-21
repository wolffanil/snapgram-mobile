import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/post.service";
import { useToast } from "@/hooks/useToast";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { getErrorMessage } from "@/services/api/getErrorMessage";
import { useMemo } from "react";
import { useRouter } from "expo-router";
import { usePhoto } from "@/hooks/usePhoto";

export const useAction = (post: IPost) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleShowToast } = useToast();

  const { deletePhoto } = usePhoto("post");

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationKey: ["delete post"],
    mutationFn: () => PostService.delete(post._id),
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries([QUERY_KEYS.GET_INFINITE_POSTS]);
      handleShowToast({ type: "success", text1: "пост успешно удален" });
      router.replace("/(tabs)");
    },
    onError: (error: string) => {
      handleShowToast({ type: "error", text1: getErrorMessage(error) });
    },
  });

  const handleDelete = () => {
    // loadingToast("Удаление поста...");

    deletePhoto(post.imageUrl);
    deletePost();
  };

  return useMemo(
    () => ({
      handleDelete,
      isDeletingPost,
    }),
    [handleDelete, isDeletingPost]
  );
};
