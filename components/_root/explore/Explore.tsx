import { View, Text, TextInput, Image } from "react-native";
import { useExplore } from "./useExplore";
import { Loading, PostCardV2, RefreshControlCustom } from "@/components/ui";
import { Controller } from "react-hook-form";
import SearchResults from "./searchResults";
import { FlashList } from "@shopify/flash-list";

const Explore = () => {
  const {
    control,
    hasNextPage,
    isLoadingPosts,
    isSearchingPosts,
    posts,
    searchPosts,
    shouldShowPosts,
    searchTerm,
    fetchNextPage,
    refetch,
  } = useExplore();

  const currentPosts = posts?.pages.flat(Infinity).flat(Infinity);

  const combinedPosts: IPost[] = currentPosts?.reduce((acc, page) => {
    return acc.concat(page.posts);
  }, []);

  if (!posts) {
    return (
      <View className="flex justify-center flex-row items-center h-screen w-full">
        <Loading />
      </View>
    );
  }
  return (
    <View className="explore-container">
      <View className="explore-inner_container ">
        <Text className="h3-bold w-full text-main-color"> Поиск постов</Text>
        <View className="flex gap-1 px-4 w-full rounded-lg bg-third-color flex-row items-center mb-3">
          <Image
            source={require("@/public/assets/icons/search.png")}
            className="h-[19px] w-[19px] "
            style={{
              objectFit: "contain",
            }}
          />

          <Controller
            control={control}
            name="searchTerm"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="заголовок, #природа, локация "
                className="input-search explore-search bg-third-color text-light-3 max-w-full focus:outline-none w-full"
                value={value.toString() || ""}
                onChangeText={onChange}
                cursorColor="#877EFF"
              />
            )}
          />
        </View>
      </View>

      <View className="flex flex-wrap gap-9 w-full max-w-5xl min-h-full">
        {searchTerm ? (
          <SearchResults
            isSearchFetching={isSearchingPosts}
            searchedPosts={searchPosts || []}
          />
        ) : shouldShowPosts ? (
          <Text className="text-light-4 mt-10 text-center w-full">
            Конец постов
          </Text>
        ) : (
          <View className="grid-container flex-1  ">
            <FlashList
              data={combinedPosts}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <PostCardV2 post={item} key={index} showStats showUser />
              )}
              keyboardDismissMode="on-drag"
              ListHeaderComponent={
                <View className="flex-between w-full max-w-5xl mt-7 mb-7 flex-row">
                  <Text className="body-bold  text-main-color">
                    Популярно сегодня
                  </Text>
                </View>
              }
              estimatedItemSize={320}
              refreshControl={
                <RefreshControlCustom
                  refreshing={isLoadingPosts}
                  onRefresh={refetch}
                />
              }
              onEndReached={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.8}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                hasNextPage ? (
                  <Loading isTheme size={30} className="flex-center" />
                ) : null
              }
              contentContainerStyle={{
                paddingBottom: 140,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Explore;
