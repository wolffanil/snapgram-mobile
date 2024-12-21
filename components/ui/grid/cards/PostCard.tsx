import { formatDateString, getMedia } from "@/utils";
import { useAuth } from "@/providers/auth/AuthProvider";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import PostStats from "../../postStats/PostStats";

function PostCard({ post }: { post: IPost }) {
  const { user } = useAuth();
  if (!post.creator) return;

  return (
    <View className="post-card bg-third-card  border-main-color">
      <View className="flex-between !items-start flex-row">
        <View className="flex items-center gap-3 flex-row">
          <Link href={`/(tabs)/profile/${post.creator?._id}`}>
            <Image
              source={{ uri: getMedia(post.creator?.imageUrl || "") }}
              alt="creator"
              className="rounded-full w-[38px] h-[38px] object-cover"
            />
          </Link>

          <View className="flex flex-col">
            <Text className="base-medium lg:body-bold text-main-color">
              {post.creator.name}
            </Text>

            <View className="flex-center gap-2 !items-start">
              <Text className="subtle-semibold lg:small-regular text-light-3">
                {formatDateString(post.createdAt || "")}
              </Text>

              <Text className="subtle-semibold  text-main-color">
                {post.location}
              </Text>
            </View>
          </View>
        </View>

        <Link
          href={`/(tabs)/update-post/${post._id}`}
          className={`${user?._id !== post.creator._id && "hidden"}`}
        >
          <Image
            source={require("@/public/assets/icons/edit.png")}
            alt="edit"
            className="w-[22px] h-[22px]"
          />
        </Link>
      </View>

      <Link href={`/(tabs)/posts/${post._id}`} className="flex-col">
        <View className="small-medium py-5 w-full">
          <Text className="text-main-color">{post.caption}</Text>
          <Text className="flex gap-1 mt-2  flex-row">
            {post?.tags.map((tag: string) => (
              <Text key={tag} className="text-light-3">
                #{tag}
              </Text>
            ))}
          </Text>
        </View>

        <Image
          source={{ uri: getMedia(post.imageUrl) }}
          className="post-card_img"
          alt="post-image"
        />
      </Link>

      <View className="mt-[20px]">
        <PostStats post={post} />
      </View>
    </View>
  );
}

export default PostCard;
