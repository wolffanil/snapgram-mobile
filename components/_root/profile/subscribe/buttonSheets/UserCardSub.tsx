import { getMedia } from "@/utils";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Image, Pressable, Text } from "react-native";

interface IUserCardSub {
  user: Pick<IUser, "_id" | "name" | "imageUrl">;
}

function UserCardSub({ user }: IUserCardSub) {
  const router = useRouter();
  const { dismiss } = useBottomSheetModal();

  return (
    <Pressable
      className={`flex flex-col items-center w-full py-[18px] gap-y-[9px]    rounded-[20px]  border-[2px] !bg-main-color !sidebar-bg-color cursor-pointer h-[110px] border-[#7878A3] mb-[14px]`}
      onPress={() => {
        dismiss?.();
        router.push(`/(tabs)/profile/${user._id}`);
      }}
    >
      <Image
        source={{ uri: getMedia(user.imageUrl || "") }}
        alt="creator"
        className={`rounded-full  w-9 h-9 object-cover`}
      />

      <Text
        className="base-medium text-main-color text-center"
        numberOfLines={1}
      >
        {user.name}
      </Text>
    </Pressable>
  );
}

export default UserCardSub;
