import CreatePost from "@/components/_root/createPost/CreatePost";
import Layout from "@/components/ui/Layout";
import { ScrollView } from "react-native";

const create = () => {
  return (
    <Layout className="!px-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-full"
        keyboardDismissMode="on-drag"
      >
        <CreatePost />
      </ScrollView>
    </Layout>
  );
};

export default create;
