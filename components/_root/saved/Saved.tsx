import { useTheme } from "@/hooks/useTheme";
import { useGetSave } from "./useGetSavePosts";
import { Text, View } from "react-native";
import { Image } from "react-native";
import { Loading, PostCardV2, RefreshControlCustom } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";

function Saved() {
  const { saves, isLoadingSaves, refetch } = useGetSave();
  const { isLight } = useTheme();

  const currentSaves = saves?.filter((save: IPost) => save?._id) ?? [];

  return (
    <View className="saved-container min-h-full">
      <View className="flex gap-2 w-full max-w-5xl flex-row items-center">
        <Image
          source={require("@/public/assets/icons/save_screen.png")}
          alt="people"
          className="w-[24px] h-[27px]"
          style={{
            objectFit: "contain",
          }}
          tintColor={isLight ? "#000" : "#fff"}
        />
        <Text className="h3-bold  text-left w-full text-main-color">
          Закладки
        </Text>
      </View>

      {isLoadingSaves ? (
        <View className="flex justify-center flex-row items-center h-screen w-full">
          <Loading />
        </View>
      ) : (
        <View className="w-full flex justify-center max-w-full gap-9 flex-1  min-h-full">
          <View className="grid-container flex-1 min-h-full">
            <FlashList
              data={currentSaves as IPost[]}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <PostCardV2 post={item} key={index} showStats showUser />
              )}
              ListEmptyComponent={
                <View className="flex-between w-full max-w-5xl mt-9 mb-7 flex-row">
                  <Text className="text-light-4 text-center">
                    Нет сохранённых постов
                  </Text>
                </View>
              }
              estimatedItemSize={320}
              refreshControl={
                <RefreshControlCustom
                  refreshing={isLoadingSaves}
                  onRefresh={refetch}
                />
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
}

export default Saved;
