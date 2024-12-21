import Register from "@/components/_auth/register/Register";
import Layout from "@/components/ui/Layout";
import { ScrollView } from "react-native";

const signup = () => {
  return (
    <Layout className="!px-[43px] pt-[140px]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="min-h-full"
        keyboardDismissMode="on-drag"
      >
        <Register />
      </ScrollView>
    </Layout>
  );
};

export default signup;
