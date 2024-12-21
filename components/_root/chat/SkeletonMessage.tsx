import Skeleton from "@/components/ui/Skeleton";
import { View } from "react-native";

interface ISkeletonMessage {
  numberOfMessage: number;
}

function isEven(number: number) {
  return number % 2 === 0;
}

function SkeletonMessage({ numberOfMessage = 1 }: ISkeletonMessage) {
  const messagesToDisplay = Math.max(1, numberOfMessage);

  return (
    <View className=" !min-h-full flex-1">
      {Array.from({ length: messagesToDisplay }, (_, index) => (
        <Skeleton
          className={`rounded-[10px] w-[102px] h-[36px] mb-[20px] ${
            isEven(index) ? "ml-auto" : "mr-auto"
          }`}
          key={index}
        />
      ))}
    </View>
  );
}

export default SkeletonMessage;
