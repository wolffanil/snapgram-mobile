import WrapperLogin from "@/components/_auth/login/WrapperLogin";
import Layout from "@/components/ui/Layout";
import SocketAuthProvider from "@/providers/secketAuth/SocketAuthProvider";
import { ScrollView } from "react-native";

const signin = () => {
  return (
    <Layout className="!px-[43px] pt-[140px]" isPaddingButton={false}>
      <SocketAuthProvider>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="min-h-full"
          keyboardDismissMode="on-drag"
        >
          <WrapperLogin />
        </ScrollView>
      </SocketAuthProvider>
    </Layout>
  );
};

export default signin;
