import Logo from "./Logo";
import { getMedia } from "../../utils";
import { useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useLogout } from "../../hooks/useLogout";
import { useAuth } from "@/providers/auth/AuthProvider";
import { Link, usePathname } from "expo-router";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "@/constants/topbarIcons";
import { useTheme } from "@/hooks/useTheme";

const imgStyle = "w-[22px] h-[23px] object-contain";

function Topbar() {
  const { top } = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const { selectedChat } = useAuth();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, needToSetIsView } = useNotification();
  const pathname = usePathname();
  const { logout, isLogoutLoading } = useLogout();
  const { isLight, toggleColorScheme } = useTheme();

  const countNotifications =
    notifications?.filter((n) => n.isView === false)?.length || 0;

  if (selectedChat?._id && pathname === "/chat") return null;

  if (pathname === "/cameraQr") return;

  const handleClose = () => setIsOpen((o) => !o);

  return (
    <View
      className="topbar  flex-row"
      style={{
        marginTop: top,
      }}
    >
      <Link href="/(tabs)" onPress={() => setIsOpen(false)}>
        <Logo className="w-[132px] h-[27px]" />
      </Link>

      <View className="flex flex-row items-center gap-x-[12px]">
        <Link
          href={`/(tabs)/profile/${user?._id}`}
          onPress={() => setIsOpen(false)}
        >
          <Image
            source={{
              uri: getMedia(user?.imageUrl || "upload/user/default.png"),
            }}
            alt="photoProfile"
            className="w-[30px] h-[30px] object-cover rounded-[27px]"
          />
        </Link>
        <Pressable
          onPress={handleClose}
          className="rounded-[8px] h-[40px] w-[40px] flex-center bg-[#f6f6f6] dark:bg-[#101012]"
        >
          <Image
            source={isOpen ? icons.close : icons.burger}
            className="w-[18px] h-[16px]"
            tintColor={isOpen ? (isLight ? "#09090A" : "#FFFFFF") : "#877EFF"}
            alt="action"
          />
        </Pressable>
      </View>

      <View
        className={`absolute z-[9] w-full ${
          isOpen ? "top-[72px]  duration-500" : "top-[-400px]  duration-500"
        } bg-[#e0e0e0]/90 dark:bg-[#101012]/90 max-h-[302px] flex flex-col items-start justify-between px-[36px] pb-[34px] pt-[50px] rounded-b-[10px] left-0 right-0 gap-y-[34px] z-10`}
        style={{
          width,
        }}
      >
        <Link href="/(tabs)/allUsers" onPress={() => handleClose()}>
          <View className="flex flex-row items-center gap-x-[12px] w-full">
            <Image
              source={require("@/public/assets/icons/people.png")}
              alt="people"
              className={imgStyle}
            />
            <Text className="text-main-color font-medium text-[16px]">
              люди
            </Text>
          </View>
        </Link>

        <Link
          href="/(tabs)/notifications"
          onPress={() => {
            needToSetIsView();
            handleClose();
          }}
        >
          <View className="flex flex-row items-center gap-x-[12px] w-full ">
            <Image
              source={require("@/public/assets/icons/notifications.png")}
              alt="people"
              className={imgStyle}
            />
            <Text className="text-main-color font-medium text-[16px]">
              уведомление
            </Text>

            {countNotifications > 0 && (
              <View className="flex-center pt-[2px] rounded-[4px] w-[20px] h-[20px] main-color ">
                <Text className="  text-white text-[12px] font-semibold ">
                  {countNotifications}
                </Text>
              </View>
            )}
          </View>
        </Link>

        <Pressable onPress={toggleColorScheme} className="w-full">
          <View className="flex flex-row items-center gap-x-[12px] w-full">
            <Image
              source={isLight ? icons.dark : icons.light}
              className={imgStyle}
            />
            <Text className="text-main-color font-medium text-[16px]">
              тема
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={async () => {
            await logout();
            handleClose();
          }}
          disabled={isLogoutLoading}
          className="w-full"
        >
          <View className="w-full flex  flex-row h-[44px] rounded-[8px] bg-red py-[13px] flex-center gap-x-[10px]">
            <Image
              source={require("@/public/assets/icons/logout.png")}
              className=" h-[14px] w-[13px]"
            />
            <Text className="text-white font-semibold text-[14px]">
              {isLogoutLoading ? "Загрузка..." : "Выйти"}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default Topbar;
