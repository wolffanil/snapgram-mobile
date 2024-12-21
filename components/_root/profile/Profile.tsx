import { useProfile } from "./useProfile";
import StatBlock from "./StackBlock";
import { useCreateChat } from "@/hooks/useCreateChat";
import { useAuth } from "@/providers/auth/AuthProvider";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Loading, RefreshControlCustom } from "@/components/ui";
import { getMedia } from "@/utils";
import Subscribers from "./subscribe/Subscribers";
import { router } from "expo-router";
import ButtonSubscribe from "./subscribe/buttonSubscribe/ButtonSubscribe";
import ProfilePosts from "./ProfilePosts";
import { Fragment, useRef } from "react";
import { BottomSheetModalRef } from "@/components/ui/bottomSheet/BottomSheetModal";
import BottomSheetDevices from "./devices/BottomSheetDevices";

function Profile() {
  const { user: currentUser } = useAuth();

  const bottomSheetDevicesRef = useRef<BottomSheetModalRef>(null);

  const handlePresent = () => bottomSheetDevicesRef.current?.present();

  const { user, isLoadingUser, refetch } = useProfile();

  const { handleCreateChat, isCreatingChat } = useCreateChat(
    user?._id || "",
    user?.name || ""
  );

  if (isLoadingUser) {
    return (
      <View className="flex-center w-full h-full flex-1">
        <Loading />
      </View>
    );
  }

  if (!user || !currentUser)
    return (
      <View className="flex-center w-full h-full ">
        <Text className="text-main-color text-[26px]">Нету пользователя</Text>
      </View>
    );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControlCustom refreshing={isLoadingUser} onRefresh={refetch} />
      }
    >
      <View className="profile-container ">
        <View className="profile-inner_container">
          <View className="flex  flex-col items-center  gap-7 ">
            <Image
              source={{
                uri:
                  getMedia(user?.imageUrl) ||
                  "/assets/icons/profile-placeholder.png",
              }}
              alt="profile"
              className="w-28 h-28   rounded-full"
            />
            <View className="flex flex-col  justify-between ">
              <View className="flex flex-col  items-center">
                <Text
                  className="text-center  h3-bold  w-full text-main-color"
                  numberOfLines={1}
                >
                  {user?.name}
                </Text>
                <Text className="small-regular  text-light-3 text-center ">
                  {user?.nick ? "@" + user.nick : ""}
                </Text>
              </View>

              <View className="flex mt-10 items-center justify-center  flex-wrap z-20 !gap-x-[13px] flex-row">
                <StatBlock value={user.posts.length} label="Посты" />
                <Subscribers />
              </View>

              <Text className="small-medium  text-start  mt-7 max-w-full text-main-color w-[320px] text-wrap">
                {user?.bio}
              </Text>
            </View>

            <View className="flex justify-center gap-4 flex-col">
              {currentUser._id === user._id ? (
                <View
                  className={` ${user._id !== currentUser._id && "hidden"}`}
                >
                  <TouchableOpacity
                    className={`h-12 bg-third-color px-5  flex-center flex-row gap-2 rounded-lg items-center  ${
                      user._id !== currentUser._id && "hidden"
                    }`}
                    onPress={() => router.push("/(tabs)/editProfile")}
                    activeOpacity={0.6}
                  >
                    <Image
                      source={require("@/public/assets/icons/edit.png")}
                      alt="edit"
                      className="w-[20px] h-[20px] object-contain"
                    />
                    <Text className="flex whitespace-nowrap small-medium text-main-color">
                      Редактировать профиль
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handlePresent}
                    className="blue-color flex-row   h-12 justify-center items-center w-[234px] rounded-lg mt-[20px] gap-x-[8px]"
                  >
                    <Image
                      source={require("@/public/assets/icons/devices.png")}
                      alt="devices"
                    />
                    <Text className=" text-white small-medium ">
                      устройства
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Fragment>
                  <ButtonSubscribe />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="h-[37px] text-[14px] px-[42px]  flex-center gap-2 blue-color rounded-lg "
                    onPress={handleCreateChat}
                    disabled={isCreatingChat}
                  >
                    <Text className=" blue-color text-white">
                      Написать сообщение
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              )}
            </View>
          </View>
        </View>

        <ProfilePosts user={user} key={user._id} />
      </View>
      <BottomSheetDevices ref={bottomSheetDevicesRef} />
    </ScrollView>
  );
}

export default Profile;
