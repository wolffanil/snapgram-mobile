import { View } from "react-native";
import Skeleton from "../../Skeleton";

interface ISkeletonPost {
  numberOfPosts?: number;
}

function SkeletonPost({ numberOfPosts = 1 }: ISkeletonPost) {
  const postsToDisplay = Math.max(1, numberOfPosts);

  return (
    <View className="flex flex-col flex-1 gap-9 w-full mb-[28px]">
      {Array.from({ length: postsToDisplay }, (_, index) => (
        <View key={index}>
          <View className="post-card bg-third-card border-main-color">
            <View className="flex-between flex-row">
              <View className="flex items-center gap-3 flex-row">
                <Skeleton className="rounded-[66px] w-[54px] h-[54px]" />

                <View className="flex flex-col">
                  <Skeleton className="w-[71px] h-[11px]" />

                  <View className="flex-center gap-2 mt-2 flex-row">
                    <Skeleton className="w-[66px] h-[10px]" />

                    <Skeleton className="w-[66px] h-[10px]" />
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row mt-[18px]">
              <View className="small-medium py-5">
                <Skeleton className="w-full h-[14px]" />
              </View>

              <Skeleton className="h-64 w-full rounded-[30px] mb-5" />
            </View>

            <View className="w-full flex justify-between items-center flex-row">
              <Skeleton className=" h-[20px] w-[170px]" />
              <Skeleton className="w-[26px] h-[23px]" />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export default SkeletonPost;
