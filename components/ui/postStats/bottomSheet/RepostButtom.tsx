import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FC, useRef } from "react";
import { Text, Pressable, Image } from "react-native";
import BottomSheetShare from "./BottomSheetShare";
import cn from "clsx";

interface IRepostButtom {
  post: IPost;
  change: boolean;
}

const RepostButtom: FC<IRepostButtom> = ({ post, change }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => bottomSheetRef.current?.present();

  return (
    <Pressable
      className="flex gap-2 mr-5 flex-row"
      onPress={handlePresentModalPress}
    >
      <Image
        source={require("@/public/assets/icons/repost.png")}
        alt="repost"
        className="h-[20px] w-[20px]"
        style={{
          objectFit: "contain",
        }}
      />

      <Text
        className={cn("small-medium text-main-color", {
          "!text-white": change,
        })}
        onPress={handlePresentModalPress}
      >
        {post?.countRepost ?? 0}
      </Text>
      <BottomSheetShare post={post} ref={bottomSheetRef} />
    </Pressable>
  );
};

export default RepostButtom;
