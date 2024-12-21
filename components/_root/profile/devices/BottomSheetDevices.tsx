import { View, Text } from "react-native";
import { useDevices } from "./useDevices";
import BottomSheetModalCustom, {
  BottomSheetModalRef,
} from "@/components/ui/bottomSheet/BottomSheetModal";
import { BottomSheetFlashList, BottomSheetView } from "@gorhom/bottom-sheet";
import { Loading } from "@/components/ui";
import DeviceItem from "./deviceItem/DeviceItem";
import { forwardRef } from "react";
import ButtonScanQr from "./ButtonScanQr";

const BottomSheetDevices = forwardRef<BottomSheetModalRef>((props, ref) => {
  const { devices, isLoadingDevices } = useDevices();

  return (
    <BottomSheetModalCustom snapPoints={["40%", "70%"]} ref={ref}>
      <BottomSheetView className="px-3 flex-1 flex-col">
        <View className="flex flex-col flex-1  h-[275px]">
          <Text className="text-main-color text-[16px] mb-[5px]">
            Активные устройства
          </Text>
          <ButtonScanQr />
          {isLoadingDevices ? (
            <Loading />
          ) : (
            <BottomSheetFlashList
              data={devices}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <DeviceItem device={item} key={item._id} />
              )}
              estimatedItemSize={58}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModalCustom>
  );
});

export default BottomSheetDevices;
