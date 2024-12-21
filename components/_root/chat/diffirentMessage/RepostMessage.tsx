import { formatDateString, getMedia } from "@/utils";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

interface IRepostMessage {
  isMyMessage: boolean;
  post: IPost;
  repostText: string;
}

function RepostMessage({ isMyMessage, post, repostText }: IRepostMessage) {
  return (
    <View
      className={`flex flex-1 flex-col justify-between py-[12px]  w-[239px] max-w-[239px] ${
        isMyMessage ? "!text-white" : "text-black dark:text-white"
      }`}
    >
      <View className="flex justify-start items-center gap-x-[10px] pl-[17px] flex-row w-full">
        <Link href={`/(tabs)/profile/${post?.creator._id}`}>
          <Image
            source={{ uri: getMedia(post?.creator.imageUrl || "") }}
            alt="logo"
            className="size-[37px] rounded-full "
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
        <View className="flex flex-col items-start">
          <Text
            className={` font-semibold text-[11px]  ${
              isMyMessage ? "!text-white" : "text-black"
            }`}
          >
            {post?.creator.name}
          </Text>
          <Text
            className={`font-medium text-[10px] ${
              isMyMessage ? "!text-white" : "text-black"
            }`}
            numberOfLines={1}
          >
            {formatDateString(post?.createdAt || "")}
          </Text>
          <Text
            className={`font-medium text-[10px] ${
              isMyMessage ? "!text-white" : "text-black"
            }`}
            numberOfLines={1}
          >
            - {post?.location}
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: getMedia(post?.imageUrl || "") }}
        alt="image"
        className="w-full h-[215px]  mt-[12px] mb-[5px]"
        style={{
          objectFit: "cover",
        }}
      />
      {repostText && (
        <Text
          className={`pl-[17px] font-medium text-[14px] pr-[17px] ${
            isMyMessage ? "!text-white" : "text-black"
          }`}
        >
          Текст пользователя: {repostText}
        </Text>
      )}
      <Text
        className={`font-semibold  pl-[17px] text-[15px] ${
          isMyMessage ? "!text-white" : "text-black"
        }`}
      >
        {post?.caption}
      </Text>
      <Link
        href={`/(tabs)/posts/${post?._id}`}
        className={` text-[13px] underline font-medium pl-[17px] ${
          isMyMessage ? "!text-white" : "text-black"
        }`}
      >
        ссылка на пост
      </Link>
    </View>
  );
}

export default RepostMessage;
