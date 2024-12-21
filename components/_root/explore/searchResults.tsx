import { PostCardV2, SkeletonPostV2 } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";

interface ISearchResults {
  isSearchFetching: boolean;
  searchedPosts: IPost[];
}

const SearchResults = ({ isSearchFetching, searchedPosts }: ISearchResults) => {
  if (isSearchFetching) return <SkeletonPostV2 numberOfPosts={3} />;

  if (searchedPosts && searchedPosts.length > 0) {
    return (
      <View className="grid-container flex-1">
        <FlashList
          data={searchedPosts}
          renderItem={({ item, index }) => (
            <PostCardV2 post={item} key={index} showStats showUser />
          )}
          keyExtractor={(item) => item._id}
          estimatedItemSize={320}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="flex-between w-full max-w-5xl mt-9 mb-7 flex-row">
              <Text className="body-bold  text-main-color">
                Найдено по запросу: {searchedPosts.length ?? 0}
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  return (
    <Text className="text-light-4 mt-10 text-center w-full">
      Нет результатов
    </Text>
  );
};

export default SearchResults;
