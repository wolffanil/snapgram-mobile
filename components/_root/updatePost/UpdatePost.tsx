import { View, ScrollView } from "react-native";
import Header from "./Header";
import { Loading, PostForm } from "@/components/ui";
import { useGetPostById } from "@/hooks/useGetPostById";

const UpdatePost = () => {
  const { post, isPostLoading } = useGetPostById();

  if (isPostLoading)
    return <Loading className="flex-1 h-screen justify-center items-center" />;

  return (
    <ScrollView className="flex mb-10">
      <View className="common-container">
        <Header />
        <PostForm action="Update" post={post} key={post} />
      </View>
    </ScrollView>
  );
};

export default UpdatePost;
