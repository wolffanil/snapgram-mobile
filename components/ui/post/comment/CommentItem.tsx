import { useLike } from "@/hooks/useLike";
import { getMedia } from "@/utils";
import { Image, Pressable, Text, View } from "react-native";

interface ICommentItem {
  comment: IComment;
  isParent?: boolean;
  postId: string;
}

function CommentItem({ comment, isParent, postId }: ICommentItem) {
  const { count, isLike, onLike } = useLike(
    comment._id,
    comment.likes,
    "",
    //@ts-ignore
    { _id: postId },
    "comment"
  );

  return (
    <View
      className={`flex flex-row  max-w-[87%] items-start mb-[15px]
${isParent ? "bg-slate-400" : ""} `}
      key={comment._id}
    >
      <View className="flex flex-row gap-[8px] w-full">
        <Image
          source={{ uri: getMedia(comment.author?.imageUrl || "") }}
          alt="profile"
          className="h-6 w-6 rounded-full"
        />

        <View className="flex flex-col gap-y-1 w-full">
          <Text className="small-medium  pr break-a mr-1 text-main-color text-[10px] w-full max-w-[80%]">
            <Text className="text-light-3 !text-[14px]">
              {comment.author.name}
            </Text>{" "}
            {comment.text}
          </Text>

          {/* <button
            className="text-[10px] lg:text-[13px] flex items-center gap-2"
            onClick={() => navigate(`/comments/${comment._id}`)}
          >
            <img
              src="/assets/icons/reply.svg"
              alt="icon"
              width={14}
              height={14}
            />
            ответить
          </button> */}
        </View>
      </View>

      <Pressable
        onPress={onLike}
        className="flex flex-row items-center gap-1 mt-1"
      >
        <Image
          source={
            isLike
              ? require("@/public/assets/icons/liked.png")
              : require("@/public/assets/icons/like.png")
          }
          alt="like"
          style={{
            objectFit: "contain",
          }}
          className="w-[18px] h-[18px]"
        />

        <Text className="text-[10px] text-light-3">{count || 0}</Text>
      </Pressable>
    </View>
  );
}

export default CommentItem;
