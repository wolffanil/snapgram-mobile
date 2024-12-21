import { getMedia, multiFormatDateString } from "@/utils";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const typeNotification = {
  like: "@/public/assets/icons/like.png | лайкнул твой пост",
  comment: "@/public/assets/icons/comment.png | прокомментировал твой пост",
  save: "@/public/assets/icons/save.png | сохранил твой пост",
  repost: "@/public/assets/icons/repost.png | поделился твоим постом",
};

function NotificationItem({ notificaion }: { notificaion: INotification }) {
  const typeN = typeNotification[notificaion.type];
  const message = typeN.split(" | ")[1];

  const typeIcon = notificaion.type;

  return (
    <View className="flex items-center  w-full pl-[20px] flex-row-reverse pr-[13px] gap-x-[10px] border-b border-main-color pb-[9px] pt-[9px] h-[74px]">
      <View className="w-[36px] h-[36px] rounded-[51px] min-w-[34px] min-h-[30px] bg-light-2 dark:bg-dark-4 flex-center">
        <Image
          source={
            typeIcon === "like"
              ? require("@/public/assets/icons/like.png")
              : typeIcon === "comment"
              ? require("@/public/assets/icons/comment.png")
              : typeIcon === "save"
              ? require("@/public/assets/icons/save.png")
              : require("@/public/assets/icons/repost.png")
          }
          alt="icon"
          className="w-[60%] h-[60%]"
          style={{
            objectFit: "contain",
          }}
        />
      </View>
      <View className="flex items-center gap-x-[8px] flex-row">
        <Link href={`/(tabs)/profile/${notificaion?.user?._id || ""}`}>
          <View>
            <Image
              source={{ uri: getMedia(notificaion?.user?.imageUrl || "") }}
              alt="photoProfile"
              className="w-[46px]  object-cover rounded-[41px]  h-[46px]"
            />
          </View>
        </Link>
        <View className="flex flex-col items-start gap-y-[2px] w-[73%]">
          <Text
            className="text-[18px] text-main-color font-semibold text-wrap max-sm:text-[12px]"
            numberOfLines={2}
          >
            {notificaion.user?.name + " " + message + " "}
            <Link href={`/posts/${notificaion?.postId?._id}`}>
              <Text numberOfLines={1}>"{notificaion?.postId?.caption}"</Text>
            </Link>
          </Text>
          <Text className="text-light-3 font-normal text-[11px]">
            {multiFormatDateString(notificaion.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default NotificationItem;
