import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";

const StatusBarComponent = () => {
  const { isLight } = useTheme();
  return (
    <StatusBar
      style={isLight ? "dark" : "light"}
      translucent
      backgroundColor={isLight ? "#EFEFEF" : "#0D0D0D"}
    />
  );
};

export default StatusBarComponent;
