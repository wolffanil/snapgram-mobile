import Post from "@/components/_root/post/post";
import Layout from "@/components/ui/Layout";
import { ScrollView } from "react-native";

const PostScreen = () => {
  return (
    <Layout className="!px-[1px] " isPaddingButton={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 min-h-full"
        keyboardDismissMode="on-drag"
      >
        <Post />
      </ScrollView>
    </Layout>
  );
};

export default PostScreen;
