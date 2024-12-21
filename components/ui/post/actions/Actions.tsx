import { useAuth } from "@/providers/auth/AuthProvider";
import Button from "../../Button";
import { useAction } from "./useAction";
import { Link } from "expo-router";
import { Image, Pressable, View } from "react-native";

function Actions({ post }: { post: IPost }) {
  const { user } = useAuth();
  const { handleDelete, isDeletingPost } = useAction(post);

  if (!user) return;

  if (user._id !== post.creator._id) return;

  return (
    <View className="flex-center flex-row  gap-x-[16px] ">
      <Link href={`/update-post/${post?._id}`}>
        <Image
          source={require("@/public/assets/icons/edit.png")}
          alt="edit"
          className="w-[19px] h-[19px]"
          style={{
            objectFit: "contain",
          }}
        />
      </Link>

      <Pressable onPress={handleDelete} disabled={isDeletingPost}>
        <Image
          source={require("@/public/assets/icons/delete.png")}
          className="w-[19px] h-[19px]"
          style={{
            objectFit: "contain",
          }}
        />
      </Pressable>
    </View>
  );
}

export default Actions;
