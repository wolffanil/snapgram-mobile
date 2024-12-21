import { Text, View } from "react-native";
import CommentItem from "./CommentItem";
import { FlashList } from "@shopify/flash-list";
import { FC } from "react";

interface IComments {
  comments: IComment[];
  postId: string;
}

const Comments: FC<IComments> = ({ comments, postId }) => {
  return (
    <View className="flex w-full mt-5 ">
      <FlashList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CommentItem comment={item} postId={postId} />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={46}
        ListEmptyComponent={
          <Text className="flex flex-row justify-center small-medium  mt-5 text-main-color text-center">
            Нет коментарий
          </Text>
        }
      />
    </View>
  );
};

export default Comments;
