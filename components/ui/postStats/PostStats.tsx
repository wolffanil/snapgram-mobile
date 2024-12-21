import { useLike } from "@/hooks/useLike";
import { useSave } from "./useSave";
import cn from "clsx";
import { usePathname } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import Loading from "../Loading";
import RepostButtom from "./bottomSheet/RepostButtom";

interface IPostStats {
  post: IPost;
  className?: string;
}

const changeStyle = ["/savePosts", "/explore"];

function PostStats({ post, className }: IPostStats) {
  const { count, isLike, onLike } = useLike(
    post?._id,
    post?.likes,
    post?.creator._id || "",
    post
  );

  const { isSave, onSave, isLoading } = useSave(
    post._id,
    post.saves,
    post?.creator._id || "",
    post
  );

  const pathname = usePathname();
  const change = changeStyle.includes(pathname);

  return (
    <View
      className={`flex justify-between items-center z-20 flex-row ${className}`}
    >
      <View className={`flex  "gap-[20px] flex-row`}>
        <View className="flex gap-2 mr-5 flex-row">
          <Pressable onPress={onLike} className="flex gap-2 mr-5 flex-row">
            <Image
              source={
                isLike
                  ? require("@/public/assets/icons/liked.png")
                  : require("@/public/assets/icons/like.png")
              }
              alt="like"
              className="size-6"
              style={{
                objectFit: "contain",
              }}
            />
            <Text
              className={cn("small-medium  text-main-color", {
                "!text-white": change,
              })}
            >
              {count || 0}
            </Text>
          </Pressable>
        </View>

        <View className="flex gap-2 mr-5 flex-row">
          <Image
            source={require("@/public/assets/icons/comment.png")}
            alt="comment"
            className="size-6"
            style={{
              objectFit: "contain",
            }}
          />

          <Text
            className={cn("small-medium  text-main-color", {
              "!text-white": change,
            })}
          >
            {post?.comments?.length || post?.commentsCount || 0}
          </Text>
        </View>

        <RepostButtom change={change} post={post} />
      </View>

      <View className="flex gap-2 flex-row">
        {isLoading ? (
          <Loading isTheme />
        ) : (
          <Pressable onPress={onSave}>
            <Image
              source={
                isSave
                  ? require("@/public/assets/icons/saved.png")
                  : require("@/public/assets/icons/save.png")
              }
              alt="save"
              className="size-6"
              style={{
                objectFit: "contain",
              }}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default PostStats;
