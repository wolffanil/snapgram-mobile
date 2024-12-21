import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { useCameraPermissions } from "expo-camera";

const ButtonScanQr = () => {
  const router = useRouter();
  const { dismiss } = useBottomSheetModal();
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  const handleScanQr = () => {
    if (!isPermissionGranted) {
      requestPermission();
      return;
    }
    dismiss?.();
    router.push("/(tabs)/cameraQr");
  };

  return (
    <TouchableOpacity
      className="blue-color flex    justify-center items-center w-full rounded-lg mt-[10px] gap-x-[8px] h-[40px] mb-2"
      activeOpacity={0.8}
      onPress={handleScanQr}
    >
      <Text className="text-white small-medium">Войти по QrСode</Text>
    </TouchableOpacity>
  );
};

export default ButtonScanQr;
