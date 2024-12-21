import { useTheme } from "@/hooks/useTheme";
import { FC } from "react";
import { ActivityIndicator, View } from "react-native";

interface ILoading {
  className?: string;
  isTheme?: boolean;
  size?: number;
}

const Loading: FC<ILoading> = ({ className, isTheme = true, size = 20 }) => {
  const { isLight } = useTheme();

  return (
    <View className={className}>
      <ActivityIndicator
        color={isTheme ? (isLight ? "#000" : "#fff") : "#fff"}
        size={size}
      />
    </View>
  );
};

export default Loading;
