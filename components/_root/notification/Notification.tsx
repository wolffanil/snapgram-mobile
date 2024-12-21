import { Loading } from "@/components/ui";
import NotificationItem from "./NotificationItem";
import { useNotification } from "@/hooks/useNotification";
import { Image, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@/hooks/useTheme";

function Notification() {
  const { notifications, isLoadingNotifications } = useNotification();

  const { isLight } = useTheme();

  if (isLoadingNotifications) {
    return <Loading />;
  }

  return (
    <View className="flex flex-1  gap-y-[38px]  mt-[40px]">
      <View className="flex items-center gap-x-[11px] flex-row">
        <Image
          source={require("@/public/assets/icons/notification.png")}
          alt="notification"
          className="object-cover w-[26px] h-[26px]"
          tintColor={isLight ? "#000" : "#fff"}
        />

        <Text className=" text-main-color font-bold text-[24px]">
          Уведомление
        </Text>
      </View>
      <View className="flex w-full flex-1">
        <FlashList
          data={notifications}
          renderItem={({ item, index }) => (
            <NotificationItem notificaion={item} key={index} />
          )}
          estimatedItemSize={74}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="flex-center text-main-color text-[20px]">
              Нет уведомлений
            </Text>
          }
        />
      </View>
    </View>
  );
}

export default Notification;
