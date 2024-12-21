import BottomSheetModalCustom, {
  BottomSheetModalRef,
} from "@/components/ui/bottomSheet/BottomSheetModal";
import { BottomSheetFlashList, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import UserCardSub from "./UserCardSub";
import { Text } from "react-native";

interface IUserModalSub {
  users: Pick<IUser, "_id" | "imageUrl" | "name">[] | undefined;
  type: "subscribers" | "subscriptions";
}

const BottomSheetSub = forwardRef<BottomSheetModalRef, IUserModalSub>(
  ({ users }, ref) => {
    return (
      <BottomSheetModalCustom ref={ref} snapPoints={["60%"]} index={0}>
        <BottomSheetView className="flex-1 px-3    gap-y-[14px] gap-[14px] justify-between ">
          <Text className="text-[15px] text-main-color">
            Количество пользователей: {users?.length ?? 0}
          </Text>
          <BottomSheetFlashList
            data={users}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <UserCardSub key={item._id} user={item} />
            )}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={140}
          />
        </BottomSheetView>
      </BottomSheetModalCustom>
    );
  }
);

export default BottomSheetSub;
