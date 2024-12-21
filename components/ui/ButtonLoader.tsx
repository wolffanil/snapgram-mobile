import cn from "clsx";
import { ActivityIndicator, Text, View } from "react-native";

function ButtonLoader({
  className,
  text = "Загрузка...",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <View className={cn("flex gap-2 flex-row items-center", className)}>
      <ActivityIndicator color="#fff" size={15} />
      <Text className="text-white">{text}</Text>
    </View>
  );
}

export default ButtonLoader;
