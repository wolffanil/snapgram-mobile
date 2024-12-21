import { useTheme } from "@/hooks/useTheme";
import { Image, Text, View } from "react-native";

const Header = () => {
  const { isLight } = useTheme();

  return (
    <View className=" flex-start gap-3 justify-start w-full flex-row">
      <Image
        source={require("@/public/assets/icons/create_post.png")}
        alt="people"
        className="w-[30px] h-[30px]"
        style={{
          objectFit: "contain",
        }}
        tintColor={isLight ? "#000" : "#fff"}
      />
      <Text className="h3-bold  text-left w-full text-main-color">
        Создать пост
      </Text>
    </View>
  );
};

export default Header;
