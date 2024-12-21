import { useTheme } from "@/hooks/useTheme";
import { FC } from "react";
import { RefreshControl, RefreshControlProps } from "react-native";

interface IRefreshControl extends RefreshControlProps {}

const RefreshControlCustom: FC<IRefreshControl> = ({
  refreshing,
  onRefresh,
  ...props
}) => {
  const { isLight } = useTheme();

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#877EFF"]}
      tintColor="#877EFF"
      progressBackgroundColor={isLight ? "#fff" : "#000"}
      {...props}
    />
  );
};

export default RefreshControlCustom;
