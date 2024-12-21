import { formatDateString, getMedia } from "@/utils";
import PostStats from "../postStats/PostStats";
import { Image, Text, View } from "react-native";
import { Link } from "expo-router";
import Actions from "./actions/Actions";
import Comments from "./comment/Comments";
import AddComment from "./comment/AddComment";

function PostDetails({ post }: { post: IPost }) {
  return (
    <View className="post_details-container ">
      <View className="post_details-card  bg-third-color">
        <Image
          source={{ uri: getMedia(post.imageUrl) }}
          alt="post"
          className="post_details-img bg-third-color "
        />

        <View className="post_details-info bg-third-color">
          <View className="flex-between w-full !items-center flex-row">
            <Link
              href={`/(tabs)/profile/${post.creator?._id}`}
              className="flex items-center"
            >
              <View className="pr-[12px] h-[50px]">
                <Image
                  source={{ uri: getMedia(post?.creator?.imageUrl || "") }}
                  alt="creator"
                  className="rounded-full h-[42px] w-[42px]"
                />
              </View>

              <View className="flex flex-col !items-start">
                <Text className="base-medium  text-main-color">
                  {post?.creator?.name}
                </Text>

                <View className="flex-center gap-2  !items-start">
                  <Text className="subtle-semibold  text-light-3">
                    {formatDateString(post?.createdAt || "")}
                  </Text>

                  <Text className="subtle-semibold  text-main-color">
                    {post?.location}
                  </Text>
                </View>
              </View>
            </Link>

            <Actions post={post} />
          </View>
          <View className="border w-full border-dark-4/80" />

          <View className="flex flex-col w-full small-medium ">
            <Text className="text-main-color">{post?.caption}</Text>
            <View className="flex gap-1 mt-2 flex-row">
              {post?.tags.map((tag: string) => (
                <Text key={tag} className="text-light-3">
                  #{tag}
                </Text>
              ))}
            </View>
          </View>

          <View className="w-full flex-col">
            <PostStats post={post} key={post?.likes?.length || ""} />
            <View className="border w-full border-dark-4/80 mt-3" />

            <Comments comments={post?.comments} postId={post._id} />
          </View>
          <View className="w-[90%]">
            <AddComment post={post} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default PostDetails;
