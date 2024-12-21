import PostStats from "../../postStats/PostStats";
import { getMedia } from "@/utils";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

interface IPostCardV2 {
  post: IPost;
  showStats?: boolean;
  showUser?: boolean;
}

function PostCardV2({ post, showStats, showUser }: IPostCardV2) {
  if (!post) return;

  return (
    <View
      key={post._id}
      className="relative min-w-[315px] min-h-80 flex-row mb-[36px]"
    >
      <Link href={`/(tabs)/posts/${post._id}`} className="grid-post_link">
        <View className="w-full h-full">
          <Image
            source={{ uri: getMedia(post.imageUrl) }}
            alt="post-image"
            className="post-card_img_v2 h-full"
          />
        </View>
      </Link>

      <View
        className={`grid-post_user flex-row flex  ${
          showUser && "bg-[#d9d9d94f]"
        }`}
      >
        {showUser && (
          <View className="flex  flex-row items-center justify-start gap-2 ">
            <Image
              source={{ uri: getMedia(post.creator.imageUrl) }}
              alt="creator"
              className="h-8 w-8 rounded-full"
            />

            <Text numberOfLines={1} className=" text-white">
              {post.creator.name}
            </Text>
          </View>
        )}

        {showStats && <PostStats post={post} className="w-[160px]" />}
      </View>
    </View>
  );
}

export default PostCardV2;
