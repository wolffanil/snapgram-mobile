import { FC, PropsWithChildren } from "react";
import { Dimensions, View } from "react-native";
import cn from "clsx";

interface ILayout {
  className?: string;
  isPaddingButton?: boolean;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({
  children,
  className,
  isPaddingButton = true,
}) => {
  return (
    <View className="flex-1 min-h-full bg-main-color">
      <View className={cn("bg-main-color  px-4 min-h-full ", className)}>
        <View
          className="h-full"
          // style={{
          //   paddingBottom: isPaddingButton ? 50 : 0,
          // }}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default Layout;
