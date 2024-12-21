import Layout from "@/components/ui/Layout";
import UpdatePost from "@/components/_root/updatePost/UpdatePost";
import { ScrollView } from "react-native";

const UpdatePostScreen = () => {
  return (
    <Layout className="!px-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-full mb-[-50px]"
        keyboardDismissMode="on-drag"
      >
        <UpdatePost />
      </ScrollView>
    </Layout>
  );
};

export default UpdatePostScreen;
