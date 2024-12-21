import { Dispatch, SetStateAction } from "react";
import { useRepost } from "./useRepost";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/auth/AuthProvider";
import { getMedia } from "@/utils";
import { Image, Pressable, Text, View } from "react-native";
import { TouchableOpacity, useBottomSheetModal } from "@gorhom/bottom-sheet";

interface IChatItemRepost {
  chat: IChat;
  n: number;
  repostText: string;
  setRepostText: Dispatch<SetStateAction<string>>;
  post: IPost;
}

function ChatItemRepost({
  chat,
  n,
  repostText,
  setRepostText,
  post,
}: IChatItemRepost) {
  const companion = chat.users[n];

  const { handleSendRepost, isSendedRepost, isSendingRepost } = useRepost(
    setRepostText,
    chat,
    post
  );

  const router = useRouter();

  const { setSelectedChat } = useAuth();
  const { dismiss } = useBottomSheetModal();

  const handelClick = () => {
    if (isSendedRepost) {
      setSelectedChat(chat);
      dismiss();
      router.push("/(tabs)/chat");
      return;
    }
    handleSendRepost(repostText);
  };

  return (
    <View className="w-full flex bg-main-color  min-h-[58px] rounded-[10px] px-[10px] pt-[8px] pb-[2px] items-center flex-row min-w-full mb-[10px]">
      <Image
        source={{ uri: getMedia(companion.imageUrl) }}
        alt="device"
        className=" rounded-full object-cover w-[33px] h-[33px]"
      />

      <View className="flex flex-col gap-y-[1px] ml-[10px] ">
        <Text
          className="text-main-color text-[12px] font-medium"
          numberOfLines={1}
        >
          {companion.name || "user"}
        </Text>
      </View>

      <Pressable
        className={`flex justify-center items-center ml-auto w-[73px] h-[33px] rounded-[5px] text-[11px] ${
          isSendedRepost
            ? "bg-second-color text-main-color"
            : "blue-color text-white "
        }`}
        disabled={isSendingRepost}
        onPress={handelClick}
      >
        <Text
          className={`text-[11px] ${
            isSendedRepost
              ? "bg-second-color text-main-color"
              : "blue-color text-white "
          }`}
          onPress={handelClick}
          disabled={isSendingRepost}
        >
          {isSendingRepost
            ? "Отправка..."
            : isSendedRepost
            ? "Чат"
            : "Отправить"}
        </Text>
      </Pressable>
    </View>
  );
}

export default ChatItemRepost;
