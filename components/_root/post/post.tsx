import { View } from "react-native";
import { Redirect } from "expo-router";
import { useGetPostById } from "@/hooks/useGetPostById";
import { Loading } from "@/components/ui";
import PostDetails from "@/components/ui/post/PostDetails";

const Post = () => {
  const { post, isPostLoading } = useGetPostById();

  if (isPostLoading) {
    return (
      <View className="flex justify-center flex-row items-center h-screen w-full">
        <Loading />
      </View>
    );
  }

  if (!post?._id) return <Redirect href="/(tabs)" />;
  return <PostDetails post={post} key={post?._id} />;
};

export default Post;
