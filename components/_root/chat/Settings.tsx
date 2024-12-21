import { BottomSheetModalRef } from "@/components/ui/bottomSheet/BottomSheetModal";
import { useRef } from "react";
import { Image, Pressable, View } from "react-native";
import BottomSheetMessage from "./actionMessageModal/BottomSheetMessage";

interface ISettings {
  message: IMessage;
}

function Settings({ message }: ISettings) {
  const bottomSheetRef = useRef<BottomSheetModalRef>(null);

  const handleModal = () => bottomSheetRef.current?.present();
  return (
    <View className="blue-color flex justify-center items-center rounded-full  size-[22px]">
      <Pressable onPress={handleModal}>
        <Image
          source={require("@/public/assets/icons/settings.png")}
          alt="settings"
          className="size-4"
          style={{ objectFit: "contain" }}
        />
      </Pressable>
      <BottomSheetMessage message={message} ref={bottomSheetRef} />
    </View>
  );
}

export default Settings;
