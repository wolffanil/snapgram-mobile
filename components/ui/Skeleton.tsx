import cn from "clsx";
import { View, ViewProps } from "react-native";

function Skeleton({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("animate-pulse rounded-md bg-gray-500", className)}
      {...props}
    />
  );
}

export default Skeleton;
