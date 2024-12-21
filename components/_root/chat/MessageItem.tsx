import cn from "clsx";
import { Image, Text, View } from "react-native";
import RepostMessage from "./diffirentMessage/RepostMessage";
import Settings from "./Settings";
import { formatDateString, getMedia } from "@/utils";

interface IMessageItem {
  message: IMessage & { status: string };
  myId: string;
  isGroupChat: boolean;
}

function MessageItem({ myId, message, isGroupChat }: IMessageItem) {
  const {
    _id,
    createdAt,
    content,
    imageUrl,
    sender,
    isRead,
    post,
    repostText,
    type,
    status,
  } = message;
  const isMyMessage = sender?._id === myId;

  return (
    <View
      className={cn(
        `flex flex-col  mt-[15px] items-start  gap-y-[3px] pr-4  min-h-[36px]`,
        {
          "!items-end": isMyMessage,
          "ml-[auto]": isMyMessage,
          "mr-[auto] ": !isMyMessage,
          "max-w-[83%]": type !== "repost",
        }
      )}
    >
      <View
        className={cn("flex items-end flex-row !min-h-[36px] w-full", {
          "!flex-row-reverse": isMyMessage,
        })}
      >
        <View
          className={cn(
            `rounded-[10px]  flex flex-center gap-y-[10px] flex-row   w-[102px] max-w-[200px] py-[10px] ${
              type === "repost" && post?._id && "!w-[239px] !max-w-[300px]"
            }  ${
              isMyMessage
                ? "message-my-bg-color ml-[10px]"
                : "message-companion-bg-color !bg-[#EFEFEF]  ml-[4px]"
            } 
            `,
            {
              "px-0": type === "repost",
              "max-w-[80%]  px-[15px]": type !== "repost",
            }
          )}
        >
          {content && (
            <Text
              className={`text-main-color font-medium  text-wrap text-[16px] w-full max-w-[300px]   ${
                isMyMessage && "!text-white"
              } ${!isMyMessage && "dark:!text-black"}`}
            >
              {content}
            </Text>
          )}
          {imageUrl && (
            <Image
              source={{ uri: getMedia(imageUrl) }}
              alt="photo"
              className="w-full h-[200px]  max-h-[200px]"
              style={{
                objectFit: "cover",
              }}
            />
          )}
          {type === "repost" && post?._id && (
            <RepostMessage
              isMyMessage={isMyMessage}
              post={post as IPost}
              repostText={repostText || ""}
            />
          )}
        </View>

        {isMyMessage && <Settings message={message} />}
      </View>
      <View className="flex items-center gap-1 mr-[-14px] flex-row">
        <Text className="text-light-4  text-[10px]">
          {formatDateString(createdAt)}
        </Text>
        {isMyMessage && !isGroupChat && (
          <Image
            source={
              status !== "pending"
                ? isRead
                  ? require("@/public/assets/icons/read/read-all.png")
                  : require("@/public/assets/icons/read/unread.png")
                : require("@/public/assets/icons/pending.png")
            }
            alt="status"
            className={cn("", {
              " w-[11px] h-[11px]": status === "pending",
              " w-[18px] h-[18px]": status !== "pending",
            })}
            style={{
              objectFit: "contain",
            }}
          />
        )}
      </View>
    </View>
  );
}

export default MessageItem;
