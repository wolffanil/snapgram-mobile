import UnReadMessage from "@/components/ui/UnReadMessage";
import { getMedia } from "@/utils";
import { router } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface IChatItem {
  chat: IChat;
  n: number;
  setSelectedChat: Dispatch<SetStateAction<IChat | null>>;
}

function ChatItem({ chat, n, setSelectedChat }: IChatItem) {
  const companion = chat.users[n];

  const handleSelecteChat = () => {
    setSelectedChat(chat);
    router.push("/(tabs)/chat");
  };

  return (
    <Pressable
      className="flex flex-row w-full  py-[9px] gap-x-[16px] min-h-[74px]  max-h-[74px] bg-main-color items-center border-b border-main-color "
      onPress={handleSelecteChat}
    >
      <View className="relative w-fit flex-row  h-[56px]">
        <Image
          source={{ uri: getMedia(companion?.imageUrl || "") }}
          alt="profileImg"
          className="w-[56px] h-[56px] object-cover rounded-[43px]"
        />

        {companion.isOnline && (
          <View className=" absolute right-0 bottom-0 h-[13px] w-[13px] ml-auto rounded-[20px] bg-[#00FF75]" />
        )}
      </View>

      <View className="flex flex-col justify-around items-start">
        <Text
          className=" text-main-color font-semibold text-[18px]"
          numberOfLines={1}
        >
          {companion.name}
        </Text>
        <View className="flex items-center gap-x-1 flex-row">
          <Text className=" text-light-3 text-[14px] font-normal">
            {chat?.latestMessage?.type === "repost" && !chat.isTyping
              ? "Запись"
              : !chat?.isTyping
              ? chat?.latestMessage?.content!?.length > 15
                ? chat?.latestMessage.content?.slice(0, 15) + "..." || ""
                : chat?.latestMessage?.content || ""
              : "Печетает..."}
          </Text>
          {chat.latestMessage &&
            chat?.latestMessage?.sender?._id !== companion?._id &&
            !chat.isGroupChat && (
              <Image
                source={
                  chat?.latestMessage?.isRead
                    ? require("@/public/assets/icons/read/read-all.png")
                    : require("@/public/assets/icons/read/unread.png")
                }
                alt="status"
                className="w-[16px] h-[16px]"
                style={{
                  objectFit: "contain",
                }}
              />
            )}
        </View>
      </View>

      {chat?.unreadMessagesCount > 0 && (
        <UnReadMessage count={chat.unreadMessagesCount} className="ml-auto" />
      )}
    </Pressable>
  );
}

export default ChatItem;
