import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";

import BottomSheetModalCustom from "../../bottomSheet/BottomSheetModal";
import RepostBox from "./RepostBox";

interface IBottomSheetShare {
  post: IPost;
}

const BottomSheetShare = forwardRef<BottomSheetModal, IBottomSheetShare>(
  ({ post }, ref) => {
    return (
      <BottomSheetModalCustom ref={ref} snapPoints={["40%", "80%"]}>
        <RepostBox post={post} />
      </BottomSheetModalCustom>
    );
  }
);

export default BottomSheetShare;
