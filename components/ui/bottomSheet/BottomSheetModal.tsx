import { useTheme } from "@/hooks/useTheme";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { forwardRef, memo, ReactNode, useCallback } from "react";
export type BottomSheetModalRef = BottomSheetModal;

interface IBottomSheetModalCustom extends BottomSheetModalProps {
  children: ReactNode;
  snapPoints?: string[] | number[];
}

const BottomSheetModalCustom = forwardRef<
  BottomSheetModalRef,
  IBottomSheetModalCustom
>(({ children, snapPoints = ["40%"], ...props }, ref) => {
  const { isLight } = useTheme();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      index={1}
      ref={ref}
      backgroundStyle={{ backgroundColor: isLight ? "#EFEFEF" : "#09090A" }}
      handleIndicatorStyle={{
        backgroundColor: isLight ? "#685DFF" : "#877EFF",
      }}
      backdropComponent={renderBackdrop}
      style={{ zIndex: 16 }}
      enableDynamicSizing={false}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
});

export default memo(BottomSheetModalCustom);
