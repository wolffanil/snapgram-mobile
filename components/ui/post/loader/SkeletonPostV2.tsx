import { View } from "react-native";
import Skeleton from "../../Skeleton";

interface ISkeletonPostV2 {
  numberOfPosts?: number;
}

function SkeletonPostV2({ numberOfPosts = 1 }: ISkeletonPostV2) {
  const postsToDisplay = Math.max(1, numberOfPosts);
  return (
    <View className="grid-container">
      {Array.from({ length: postsToDisplay }, (_, index) => (
        <View key={index}>
          <Skeleton className="relative h-80 rounded-[30px] max-w-[98%] min-w-0" />
        </View>
      ))}
    </View>
  );
}

export default SkeletonPostV2;
