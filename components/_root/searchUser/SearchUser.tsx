import { Controller } from "react-hook-form";
import { View, Text, TextInput, Image } from "react-native";
import { useSearchUser } from "./useSearchUser";
import { useTheme } from "@/hooks/useTheme";
import { Loading, RefreshControlCustom, UserCard } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";

const SearchUser = () => {
  const {
    control,
    isLoadingUsers,
    isSearchingUsers,
    searchTerm,
    searchUsers,
    users,
    refetch,
  } = useSearchUser();

  const { isLight } = useTheme();

  const creators = searchTerm !== "" ? searchUsers : users;

  return (
    <View className="common-container max-h-full">
      <View className="user-container  max-h-full">
        <View className=" flex-start gap-3 justify-start w-full flex-row">
          <Image
            source={require("@/public/assets/icons/people_v2.png")}
            alt="people"
            className="w-[36px] h-[36px]"
            style={{
              objectFit: "contain",
            }}
            tintColor={isLight ? "#000" : "#fff"}
          />

          <Text className="h3-bold  text-left w-full text-main-color">
            Все пользователи
          </Text>
        </View>

        <View className="flex gap-1 px-4 w-full rounded-lg bg-third-color flex-row items-center">
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
                placeholder="Константин @user"
                className="input-search explore-search bg-third-color text-light-3  focus:outline-none w-full !max-w-full"
                value={value.toString() || ""}
                onChangeText={onChange}
                cursorColor="#877EFF"
              />
            )}
          />
        </View>
        {!creators?.length && !isSearchingUsers && !isLoadingUsers && (
          <Text className="text-main-color text-[28px]">
            Ничего не найденно
          </Text>
        )}
        {isLoadingUsers && isSearchingUsers && !creators ? (
          <View className="flex justify-center flex-row items-center h-screen w-full">
            <Loading />
          </View>
        ) : (
          <View className="user-grid !h-full  ">
            <FlashList
              data={creators}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <UserCard user={item} key={index} />
              )}
              keyboardDismissMode="on-drag"
              estimatedItemSize={236}
              refreshControl={
                <RefreshControlCustom
                  refreshing={isLoadingUsers}
                  onRefresh={refetch}
                />
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 70,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchUser;
