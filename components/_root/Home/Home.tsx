import { View, Text } from "react-native";
import { useHome } from "./useHome";
import { Loading, RefreshControlCustom, SkeletonPost } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import PostCard from "@/components/ui/grid/cards/PostCard";

const Home = () => {
  const {
    posts,
    fetchNextPage,
    hasNextPage,
    isErrorPosts,
    isLoading,
    refetch,
  } = useHome();

  const currentPosts = posts?.pages.flat(Infinity).flat(Infinity);

  const combinedPosts: IPost[] = currentPosts?.reduce((acc, page) => {
    return acc.concat(page.posts);
  }, []);

  return (
    <View className="flex min-h-full">
      <View className="home-container h-full">
        <View className="home-posts h-full">
          {!combinedPosts ? (
            <SkeletonPost numberOfPosts={2} />
          ) : (
            <View className="flex flex-col gap-7 w-full min-h-screen">
              <FlashList
                data={combinedPosts}
                keyExtractor={(item) => item._id}
                estimatedItemSize={474}
                renderItem={({ item }) => (
                  <PostCard key={item._id} post={item} />
                )}
                ListHeaderComponent={() => (
                  <Text className="h3-bold text-left w-full text-main-color mb-[18px]">
                    Лента
                  </Text>
                )}
                refreshControl={
                  <RefreshControlCustom
                    refreshing={isLoading}
                    onRefresh={refetch}
                  />
                }
                onEndReached={() => {
                  if (hasNextPage) {
                    fetchNextPage();
                  }
                }}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.8}
                ListFooterComponent={
                  hasNextPage ? (
                    <Loading isTheme size={30} className="flex-center" />
                  ) : null
                }
                contentContainerStyle={{ paddingBottom: 160 }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;
