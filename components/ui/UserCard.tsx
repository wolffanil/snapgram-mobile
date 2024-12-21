import { useCreateChat } from "@/hooks/useCreateChat";
import { getMedia } from "@/utils";
import { useRouter } from "expo-router";
import { FC } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Button from "./Button";

interface IUserCard {
  user: IUser;
}

const UserCard: FC<IUserCard> = ({ user }) => {
  const { isCreatingChat, handleCreateChat } = useCreateChat(
    user?._id || "",
    user?.name || ""
  );

  const router = useRouter();

  // to={`/profile/${user._id}`}

  return (
    <View className="user-card border-main-color flex-1 min-w-[200px] w-full mb-[24px]">
      <Pressable onPress={() => router.push(`/(tabs)/profile/${user._id}`)}>
        <Image
          source={{ uri: getMedia(user.imageUrl || "") }}
          alt="creator"
          className="rounded-full w-14 h-14 object-cover"
        />
      </Pressable>

      <View className="flex-center flex-col gap-1">
        <Text
          className="base-medium text-main-color text-center "
          numberOfLines={1}
        >
          {user.name}
        </Text>
        {user?.nick && <Text className="text-light-3">@{user.nick}</Text>}
      </View>

      <Button
        className="!px-6 !h-[29px]"
        onPress={handleCreateChat}
        disabled={isCreatingChat}
      >
        чат
      </Button>
    </View>
  );
};

export default UserCard;
