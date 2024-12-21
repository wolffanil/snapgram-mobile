import { useMyChats } from "@/hooks/useMyChats";
import { useAuth } from "@/providers/auth/AuthProvider";
import { View, Text, ScrollView } from "react-native";
import Header from "./Header";
import ChatItem from "./ChatItem";
import { getСompanion } from "@/utils";
import { FlashList } from "@shopify/flash-list";

const Chats = () => {
  const { chats, isLoadingChats } = useMyChats();
  const { setSelectedChat, user } = useAuth();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" flex-col items-start gap-y-[25px] mt-[46px]  w-full flex-1 px-[20px] max-w-full min-w-full">
        <Header />
        {isLoadingChats ? (
          <Text className="text-main-color text-[18px]">Загрузка чатов...</Text>
        ) : (
          <View className="flex-1 w-full h-full max-w-full">
            <FlashList
              data={chats}
              keyExtractor={(item) => item._id}
              estimatedItemSize={74}
              renderItem={({ item: chat, index }) => {
                const n = chat?.isGroupChat
                  ? 0
                  : getСompanion(chat?.users, user?._id || "");
                return (
                  <ChatItem
                    key={index}
                    chat={chat}
                    setSelectedChat={setSelectedChat}
                    n={n}
                  />
                );
              }}
              ListEmptyComponent={
                <Text className="text-main-color text-[23px]">Нету чатов</Text>
              }
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Chats;
