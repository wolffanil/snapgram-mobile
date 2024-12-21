import { FC, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useActionMessage } from "./useActionMessage";
import { BottomSheetView } from "@gorhom/bottom-sheet";

interface IActionsSheetMessage {
  message: IMessage;
}

const ActionsSheetMessage: FC<IActionsSheetMessage> = ({ message }) => {
  const isRepostMessage = message.type === "repost";

  const initailState = isRepostMessage
    ? message?.repostText
      ? message?.repostText
      : ""
    : message?.content
    ? message.content
    : "";
  const [text, setText] = useState(initailState);

  const { onClickButton, isLoading } = useActionMessage({
    messageId: message._id,
  });

  const handleDeleteMessage = () => onClickButton("delete");

  const handleUpdateMessage = () => {
    if (initailState === text) return;
    onClickButton("update", {
      type: isRepostMessage ? "repost" : "text",
      text,
    });
  };
  return (
    <BottomSheetView className="w-full h-full flex flex-col items-start px-3">
      <View className="mb-[9px] ">
        <Text className="text-sm font-medium leading-none  text-second-color text-[24px]">
          {isRepostMessage ? "Редактировать репост" : "Редактировать сообщение"}
        </Text>
      </View>
      <TextInput
        onChangeText={(e) => setText(e)}
        value={text?.toString() ?? ""}
        className="shad-input bg-main-color text-main-color w-full  placeholder:text-dark-2  dark:placeholder:text-light-1 ring-offset-primary-600 dark:ring-offset-primary-500 placeholder:text-[15px] !important"
        placeholder="сообщение"
        cursorColor="#877EFF"
      />
      <View className=" mt-[10px] flex gap-x-[10px] flex-row">
        <Pressable
          className="justify-center items-center ml-auto w-[82px]  min-w-[120px] h-[40px] rounded-[5px] blue-color"
          onPress={handleUpdateMessage}
          disabled={isLoading}
        >
          <Text
            className="blue-color text-white font-semibold text-[13px]"
            onPress={handleUpdateMessage}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Редактировать"}
          </Text>
        </Pressable>
        <Pressable
          className="flex justify-center items-center ml-auto w-[82px]  min-w-[53px] h-[40px] rounded-[5px]  bg-red "
          onPress={handleDeleteMessage}
          disabled={isLoading}
        >
          <Text
            className="text-white text-[13px] font-semibold"
            onPress={handleDeleteMessage}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Удалить"}
          </Text>
        </Pressable>
      </View>
    </BottomSheetView>
  );
};

export default ActionsSheetMessage;
