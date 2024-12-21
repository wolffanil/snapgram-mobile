import { View } from "react-native";
import Header from "./Header";
import { PostForm } from "@/components/ui";

const CreatePost = () => {
  return (
    <View className="flex min-h-full ">
      <View className="common-container min-h-full">
        <Header />
        <PostForm action="Create" />
      </View>
    </View>
  );
};

export default CreatePost;
