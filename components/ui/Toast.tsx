import { getMedia } from "@/utils";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RnToast, { BaseToast } from "react-native-toast-message";

const options = (primaryColor: string) => ({
  style: { backgroundColor: "#877eff", borderLeftColor: primaryColor },
  text1Style: {
    color: "#fff",
    fontSize: 16,
  },
  text2Style: {
    fontSize: 14,
    color: "#fff",
  },
});

const Toast = () => {
  return (
    <RnToast
      topOffset={50}
      config={{
        success: (props) => <BaseToast {...props} {...options("#67e769")} />,
        info: (props) => <BaseToast {...props} {...options("#685DFF")} />,
        error: (props) => <BaseToast {...props} {...options("#ff4949")} />,
        message: ({ props }: { props: IToastMessage }) => {
          const { sender, currentChat, setChat } = props;

          return (
            <View className="flex flex-row justify-between items-center max-h-[40px] max-w-[200px] w-[200px] bg-gray-800 rounded-md p-2">
              <Image
                source={{ uri: getMedia(sender.imageUrl) }}
                className="rounded-full min-w-[40px] max-w-[40px] max-h-[40px] object-cover"
                alt="profile"
              />

              <Text className="text-[14px] text-white p-[5px] flex-1 pl-2">
                {!currentChat ? "У вас новый собеседник" : "Новое сообщение"}
              </Text>

              {currentChat && (
                <TouchableOpacity
                  onPress={() => {
                    setChat();
                    router.push("/(tabs)/chat");
                  }}
                  className=" ml-[10px] bg-primary-600 px-[10px] py-[5px] rounded-[5px]"
                  activeOpacity={0.5}
                >
                  <Text className="text-white text-[15px]">Чат</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        },
      }}
    />
  );
};

export default Toast;
