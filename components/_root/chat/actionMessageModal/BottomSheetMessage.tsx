import BottomSheetModalCustom, {
  BottomSheetModalRef,
} from "@/components/ui/bottomSheet/BottomSheetModal";
import { forwardRef } from "react";
import ActionsSheetMessage from "./ActionsSheetMessage";

interface IBottomSheetMessage {
  message: IMessage;
}

const BottomSheetMessage = forwardRef<BottomSheetModalRef, IBottomSheetMessage>(
  ({ message }, ref) => {
    return (
      <BottomSheetModalCustom snapPoints={["20%"]} ref={ref}>
        <ActionsSheetMessage message={message} />
      </BottomSheetModalCustom>
    );
  }
);

export default BottomSheetMessage;
