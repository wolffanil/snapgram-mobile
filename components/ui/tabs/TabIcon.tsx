import { FC } from "react";
import { View, Image } from "react-native";
import { TabIconProps } from "./tabIcon.interface";
import cn from "clsx";
import { useTheme } from "@/hooks/useTheme";

const TabIcon: FC<TabIconProps> = ({ icon, focused }) => {
  const { isLight } = useTheme();

  return (
    <View
      className={cn(
        "justify-center items-center w-[43px] h-[43px] rounded-[10px] ",
        focused && "bg-primary-600 dark:bg-primary-500"
      )}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={focused ? "#ffffff" : isLight ? "#685DFF" : "#877EFF"}
        className="w-[22px] h-[22px]"
      />
    </View>
  );
};

export default TabIcon;
