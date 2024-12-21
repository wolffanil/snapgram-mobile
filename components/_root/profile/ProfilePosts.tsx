import { PostCardV2 } from "@/components/ui";
import { useAuth } from "@/providers/auth/AuthProvider";
import { FlashList } from "@shopify/flash-list";
import { FC, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import LikedPosts from "./likePosts/LikePosts";

interface IProfilePosts {
  user: IUser & { posts: IPost[] };
}

const ProfilePosts: FC<IProfilePosts> = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [isShowLike, setIsShowLike] = useState(false);

  if (!currentUser || !user) return null;

  return (
    <View className="flex-1 w-full ">
      {currentUser._id === user._id && (
        <View className="flex max-w-full w-full flex-row mb-[16px] ">
          <Pressable
            className={`profile-tab  border-main-color bg-main-color border rounded-l-lg text-main-color  ${
              !isShowLike && "bg-third-color border-[0px]"
            }`}
            onPress={() => setIsShowLike(false)}
          >
            <Image
              source={require("@/public/assets/icons/posts.png")}
              className="w-[20px] h-[20px] object-contain"
            />
            <Text className="text-main-color">Посты</Text>
          </Pressable>
          <Pressable
            className={`profile-tab border-main-color bg-main-color border rounded-r-lg  ${
              isShowLike && "bg-third-color border-[0px]"
            }`}
            onPress={() => setIsShowLike(true)}
          >
            <Image
              source={require("@/public/assets/icons/like.png")}
              className="w-[20px] h-[18px]"
              style={{
                objectFit: "contain",
              }}
            />
            <Text className="text-main-color">Лайки</Text>
          </Pressable>
        </View>
      )}

      <FlashList
        data={user.posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <PostCardV2 post={item} key={index} />}
        estimatedItemSize={320}
        showsVerticalScrollIndicator={false}
        className={isShowLike ? "hidden" : "block"}
      />

      {currentUser._id === user._id && <LikedPosts isShowLike={isShowLike} />}
    </View>
  );
};

export default ProfilePosts;
