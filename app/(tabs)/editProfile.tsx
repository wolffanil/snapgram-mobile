import UpdateProfile from "@/components/_root/updateProfile/UpdateProfile";
import Layout from "@/components/ui/Layout";
import { ScrollView } from "react-native";

const editProfile = () => {
  return (
    <Layout className="!px-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        <UpdateProfile />
      </ScrollView>
    </Layout>
  );
};

export default editProfile;
