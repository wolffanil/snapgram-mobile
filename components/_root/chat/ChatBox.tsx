import { useAuth } from "@/providers/auth/AuthProvider";
import { useAllMessages } from "./useAllMessages";
import { FlatList, Text, View } from "react-native";
import { Redirect } from "expo-router";
import UserBox from "./UserBox";
import SkeletonMessage from "./SkeletonMessage";
import WriteMessage from "./writeMessage/WriteMessage";
import MessageItem from "./MessageItem";

function ChatBox() {
  const { selectedChat, user } = useAuth();
  const { messages, isLoadingMessages } = useAllMessages(
    selectedChat?._id || ""
  );

  if (!selectedChat?._id) return <Redirect href="/(tabs)/chats" />;

  return (
    <View
      className={`${
        selectedChat?._id ? "flex" : "hidden"
      }  flex-col  w-full  border-main-color   pt-[27px]  bg-main-color border-[0px] rounded-[0px] pl-[0px] pr-[0px] py-[0px]  flex-1 mt-[16px] min-h-full pb-[38px]`}
    >
      <UserBox />

      <View className=" h-[1px] bg-light-3  mt-[13px] w-full" />

      <View className="flex flex-col mt-[24px]  flex-1 overflow-y-auto w-full">
        {isLoadingMessages ? (
          <SkeletonMessage numberOfMessage={5} />
        ) : (
          <View className=" flex-1">
            <FlatList
              data={messages}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <MessageItem
                  isGroupChat={selectedChat?.isGroupChat || false}
                  key={index}
                  //@ts-ignore
                  message={item}
                  myId={user?._id || ""}
                />
              )}
              ListEmptyComponent={
                <Text className="text-main-color flex-center">
                  Сообщении нету
                </Text>
              }
            />
          </View>
        )}
      </View>

      <View className="w-full h-[1px] bg-light-3  mb-[20px]" />

      <WriteMessage key={selectedChat?._id} />
    </View>
  );
}

export default ChatBox;
