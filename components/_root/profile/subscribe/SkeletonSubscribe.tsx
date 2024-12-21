import Skeleton from "@/components/ui/Skeleton";
import { View } from "react-native";

function SkeletonSubscribe() {
  return (
    <View className="flex   items-center flex-col gap-x-[4px] w-[103px] gap-y-2">
      <Skeleton className=" rounded-lg w-[27px] h-[17px]" />
      <Skeleton className="rounded-lg w-full  h-[17px]" />
    </View>
  );
}

export default SkeletonSubscribe;
