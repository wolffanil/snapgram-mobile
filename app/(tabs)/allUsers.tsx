import SearchUser from "@/components/_root/searchUser/SearchUser";
import Layout from "@/components/ui/Layout";

const allUsers = () => {
  return (
    <Layout className="!px-0">
      <SearchUser />
    </Layout>
  );
};

export default allUsers;
