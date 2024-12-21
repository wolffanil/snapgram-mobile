import { useState } from "react";
import { useWriteMessage } from "./useWriteMessage";
import { useSocket } from "@/hooks/useSocket";
import { Image, Pressable, TextInput, View } from "react-native";
import EmojiPickerComponent from "./EmojiPicker";

function WriteMessage() {
  const { handleSendMessage, message, setMessage } = useWriteMessage();
  const { handleTyping, handleStopTyping } = useSocket();

  const [typing, setTyping] = useState(false);

  const handleClickKeyboard = () => {
    handleStopTyping();
    handleSendMessage();
  };

  const typingHandler = (e: any) => {
    if (e?.emoji) {
      setMessage((m) => m + e.emoji);
    } else {
      setMessage(e);
    }
    if (!typing) {
      setTyping(true);

      handleTyping();
    }

    let lastTypingTime = new Date().getTime();

    const timerLength = 2000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        handleStopTyping();
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <View className="flex items-start w-full gap-x-[7px]  h-[51px] flex-row">
      <View className="flex items-center px-[20px] flex-row gap-x-[4px] bg-[#EFEFEF] dark:bg-[#101012] rounded-[10px] h-full w-[80%] mx-auto">
        <Pressable>
          <Image
            source={require("@/public/assets/icons/clip.png")}
            alt="clip"
            className="w-[13px] h-[16px]"
            style={{ objectFit: "contain" }}
          />
        </Pressable>
        <TextInput
          value={message ?? ""}
          onChangeText={typingHandler}
          placeholder="Напишите сообщение"
          className="text-[16px] w-[87%] font-normal text-light-3 placeholder:text-light-3  border-[0px] bg-[#EFEFEF] dark:bg-[#101012] focus:outline-none  max-w-full"
          cursorColor="#877EFF"
          onSubmitEditing={handleClickKeyboard}
        />

        <EmojiPickerComponent handlePick={typingHandler} />
      </View>
      <Pressable
        onPress={() => {
          handleSendMessage();
        }}
        className="flex-center  w-[54px] h-full main-color  rounded-[10px]"
      >
        <Image
          source={require("@/public/assets/icons/send-message.png")}
          alt="send-message"
          className="size-[16px]"
          style={{
            objectFit: "contain",
          }}
        />
      </Pressable>
    </View>
  );
}

export default WriteMessage;
