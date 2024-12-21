import { CameraView } from "expo-camera";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Platform } from "react-native";
import { useScanQr } from "./useScanQr";
import { useAuth } from "@/providers/auth/AuthProvider";
import { Overlay } from "./Overlay";

const CameraQr = () => {
  const router = useRouter();
  const { qrcode, setQrcode, isPending, sendTokenQr } = useScanQr();
  const { user } = useAuth();
  const pathname = usePathname();

  function handleScan(data: string) {
    if (data) {
      if (qrcode) return;

      setQrcode(String(data));
      setTimeout(() => {
        sendTokenQr();
        router.replace(`/(tabs)/profile/${user?._id}`);
      }, 500);
    }
  }

  return (
    <SafeAreaView
      className="absolute "
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      {Platform.OS === "android" ? (
        <StatusBar hidden={pathname !== "/cameraQr" ? false : true} />
      ) : null}
      <CameraView
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => handleScan(data)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
};

export default CameraQr;
