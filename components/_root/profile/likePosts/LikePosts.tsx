import { PostCardV2, SkeletonPostV2 } from "@/components/ui";
import { useGetLikePosts } from "./useLikePosts";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Fragment } from "react";

interface ILikePosts {
  isShowLike: boolean;
}

function LikedPosts({ isShowLike }: ILikePosts) {
  const { posts, isLoadingPosts } = useGetLikePosts();

  if (isLoadingPosts) return <SkeletonPostV2 numberOfPosts={3} />;

  return (
    <Fragment>
      {!posts?.length && isShowLike && (
        <View className="w-full mt-2">
          <Text className="text-light-4 text-center">
            Нет понравившегося поста
          </Text>
        </View>
      )}

      <FlashList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => <PostCardV2 post={item} key={index} />}
        estimatedItemSize={320}
        showsVerticalScrollIndicator={false}
        className={isShowLike ? "block" : "hidden"}
      />
    </Fragment>
  );
}

export default LikedPosts;
