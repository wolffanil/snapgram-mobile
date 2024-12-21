import { View, Text, TextInput } from "react-native";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import ChatItemRepost from "./ChatItemRepost";
import { getСompanion } from "@/utils";
import { useMyChats } from "@/hooks/useMyChats";
import { useAuth } from "@/providers/auth/AuthProvider";
import { FC, useState } from "react";
import Loading from "../../Loading";

interface IRespostBox {
  post: IPost;
}

const RepostBox: FC<IRespostBox> = ({ post }) => {
  const { chats, isLoadingChats } = useMyChats();

  const { user } = useAuth();

  const [repostText, setRepostText] = useState("");

  return (
    <BottomSheetView className="flex flex-col px-3 w-full h-full">
      <View className=" peer-disabled:cursor-not-allowed peer-disabled:opacity-70  mb-[9px] ">
        <Text className="text-second-color text-sm font-medium leading-none text-[16px]">
          Написать сообщение
        </Text>
      </View>
      <TextInput
        onChangeText={(e) => setRepostText(e)}
        value={repostText ?? ""}
        className="shad-input bg-main-color text-main-color w-full disabled:opacity-50 placeholder:text-dark-2  dark:placeholder:text-light-1  border-black dark:border-white placeholder:text-[15px] !important"
        placeholder="Сообщение"
        cursorColor="#877EFF"
      />

      <View className="flex flex-col w-full  gap-y-[14px]  min-h-[275px] mt-4 ">
        {isLoadingChats ? (
          <Loading />
        ) : (
          <BottomSheetFlatList
            data={chats}
            renderItem={({ item, index }) => {
              const n = item?.isGroupChat
                ? 0
                : getСompanion(item?.users, user?._id || "");
              return (
                <ChatItemRepost
                  key={item._id}
                  chat={item}
                  n={n}
                  post={post}
                  repostText={repostText}
                  setRepostText={setRepostText}
                />
              );
            }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              <Text className="text-main-color text-[23px]">Нету чатов</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </BottomSheetView>
  );
};

export default RepostBox;
