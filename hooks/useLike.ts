import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeService } from "../services/like.service";
import { QUERY_KEYS } from "../shared/enums/queryKeys";
import { useNotification } from "./useNotification";
import { useAuth } from "@/providers/auth/AuthProvider";

export const useLike = (
  id: string,
  likes: ILike[],
  creator: string,
  post?: IPost,
  type?: "post" | "comment"
) => {
  const { user } = useAuth();
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState<number>(likes?.length || 0);
  const { createNotification, removeNotification } = useNotification();

  useEffect(() => {
    if (count === likes?.length) return;
    setCount(likes?.length ?? 0);
  }, [likes]);

  const isComment = type === "comment";

  const { mutateAsync: createLike, isPending: isCreatingLike } = useMutation({
    mutationKey: ["create like"],
    mutationFn: () =>
      LikeService.like(isComment ? undefined : id, isComment ? id : undefined),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_LIKED_POSTS],
      });

      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER_SAVES],
      });

      if (post?._id) {
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, post?._id],
        });
      }

      if (!creator) return;
      if (creator === user?._id) return;

      //@ts-ignore
      createNotification({ postId: post || "", to: creator, type: "like" });
    },
  });

  const { mutateAsync: deleteLike, isPending: isDeletingLike } = useMutation({
    mutationKey: ["delete like"],
    mutationFn: (likeId: string) => LikeService.delete(likeId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_LIKED_POSTS],
      });

      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, post?._id],
      });

      //@ts-ignore
      // await queryClient.invalidateQueries([QUERY_KEYS.GET_INFINITE_POSTS]);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_INFINITE_POSTS],
        (oldData: IInfinityPosts) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((currentPost) =>
                currentPost._id === post?._id
                  ? {
                      ...currentPost,
                      likes: currentPost.likes.filter(
                        //@ts-ignore
                        (like) => like?.userId !== user?._id
                      ),
                    }
                  : currentPost
              ),
            })),
          };
        }
      );

      if (creator === user?._id) return;
      //@ts-ignore
      removeNotification({ postId: post?._id, type: "like", to: creator });
    },
  });

  useEffect(() => {
    if (isCreatingLike || isDeletingLike) return;

    if (!likes?.length) {
      setIsLike(false);
      return;
    }

    // @ts-ignore
    const isHasLike =
      likes.some((l) => String(l?.userId) === String(user?._id)) ?? false;

    setIsLike(!!isHasLike);
  }, [isCreatingLike, isDeletingLike, likes]);

  const queryClient = useQueryClient();

  const onLike = async () => {
    if (isLike) {
      //@ts-ignore
      const like = likes.find((l) => l.userId === user?._id);
      if (!like) return;
      setIsLike(false);
      setCount((c) => c - 1);
      deleteLike(like._id);
    } else {
      setCount((c) => c + 1);
      setIsLike(true);
      createLike();
    }
  };

  return useMemo(
    () => ({
      onLike,
      isLike,
      count,
    }),
    [isLike, onLike, likes]
  );
};
