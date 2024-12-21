import { View, Text, Image } from "react-native";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const { isLight } = useTheme();
  return (
    <View className="w-full flex-start gap-3 justify-start flex-row">
      <Image
        source={require("@/public/assets/icons/chat.png")}
        className="w-[32px] h-[32px]"
        style={{
          objectFit: "contain",
        }}
        alt="chat"
        tintColor={isLight ? "#000" : "#fff"}
      />
      <Text className="h3-bold  text-left w-full text-main-color">Чаты</Text>
    </View>
  );
};

export default Header;
