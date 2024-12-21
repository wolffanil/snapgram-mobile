import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentService } from "@/services/comment.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { getDefaultProfileImage, getMedia } from "@/utils";
import { useNotification } from "@/hooks/useNotification";
import { create } from "mutative";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, TextInput, View } from "react-native";

function AddComment({ post }: { post: IPost }) {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const { postId } = useLocalSearchParams();

  const { createNotification } = useNotification();

  const queryClient = useQueryClient();
  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationKey: ["create comment"],
    mutationFn: () =>
      CommentService.create({ text: comment, postId: postId.toString() }),
    onSuccess: (comment) => {
      setComment("");
      queryClient.setQueryData(
        [QUERY_KEYS.GET_POST_BY_ID, comment.postId],
        (oldPost: IPost) => {
          return create(oldPost, (draft) => {
            draft.comments.push({
              ...comment,
              author: { ...user },
            } as IComment);
          });
        }
      );

      if (post?.creator?._id === user?._id) return;

      //@ts-ignore
      createNotification({
        postId: post,
        to: post.creator._id,
        type: "comment",
      });
    },
  });

  const handleCreateComment = () => {
    if (comment === "") return;
    createComment();
  };

  return (
    <View className="flex-row flex gap-[11px] mt-10 items-center">
      <Image
        source={{ uri: getMedia(user?.imageUrl || "") }}
        alt="profile"
        className="rounded-full object-cover min-w-[32px] h-[32px]"
      />

      <View className="flex flex-row justify-between px-[16px]  items-center rounded-[8px]  w-full h-[44px] write-color bg-main-color">
        <TextInput
          placeholder="Напишите свой комментарий..."
          className=" focus:outline-none w-[190px] subtle-semibold  dark:placeholder:text-white dark:text-white write-color"
          onChangeText={(e) => setComment(e)}
          value={comment}
          editable={!isCreatingComment}
          cursorColor="#877EFF"
        />
        <Pressable onPress={handleCreateComment}>
          <Image
            source={require("@/public/assets/icons/send.png")}
            alt="send"
            style={{
              objectFit: "cover",
            }}
            className="w-[22px] h-[22px]"
            tintColor={"#877EFF"}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default AddComment;
