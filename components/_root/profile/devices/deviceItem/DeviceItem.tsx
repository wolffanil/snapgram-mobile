import { formatDateString } from "@/utils";
import { browserType, osType } from "./deviceItem.constants";
import { useDevice } from "./useDevice";
import { Image, Pressable, Text, View } from "react-native";

import icons from "./deviceItem.constants";

interface IDevice extends IToken {
  isCorrentDevice: boolean;
}

function DeviceItem({ device }: { device: IDevice }) {
  const { isDeletingToken, deleteDevice, handleSendHello } = useDevice(
    device._id
  );

  let imagePath;
  if (device.type === "browser") {
    const browser = device.browser.split(" ")[0];
    imagePath = browserType[browser];
  } else {
    const os = device.device;
    imagePath = osType[os];
  }

  return (
    <View className="w-full flex bg-main-color min-h-[58px] rounded-[10px] px-[10px] pt-[8px] pb-[2px] items-center flex-row mb-[14px]">
      <View className="flex justify-center items-center rounded-[50px] blue-color w-[33px]  h-[33px]">
        <Image
          source={
            imagePath === "Chrome"
              ? icons.chrome
              : imagePath === "Mozila"
              ? icons.mozila
              : imagePath === "Edge"
              ? icons.edge
              : imagePath === "Safari"
              ? icons.safari
              : imagePath === "Android"
              ? icons.android
              : icons.ios
          }
          alt="device"
          className="w-[19px] h-[19px]"
          style={{
            objectFit: "contain",
          }}
        />
      </View>

      <View className="flex flex-col gap-y-[1px]  ml-[10px]">
        <Text className=" text-[12px] text-main-color font-medium">
          {device.ip}
          <Text className=" text-[10px] ">
            {"-" + formatDateString(device.createdAt)}
          </Text>
        </Text>
        <Text className="text-[12px] text-main-color font-medium">
          {device.type === "browser"
            ? device.browser
            : `${device.brand} | ${device.model}`}
        </Text>
        <Text className="text-[12px] text-main-color font-medium">
          {device.device}
        </Text>
      </View>

      {!device.isCorrentDevice && (
        <Pressable
          className={`flex justify-center items-center  bg-secondary-500   ml-[20px] mr-1 w-[23px] h-[23px] rounded-[50px] ${
            device.type !== "browser" && "ml-[1px]"
          }`}
          onPress={() => handleSendHello()}
        >
          <Image
            source={require("@/public/assets/icons/hand.png")}
            alt="hand"
            className="w-[13px] h-[13px]"
            style={{
              objectFit: "contain",
            }}
          />
        </Pressable>
      )}

      {device.isCorrentDevice ? (
        <Text className="flex justify-center items-center  bg-second-color text-main-color  w-[80px] h-[23px] text-[12px]  rounded-[5px] ml-auto text-center pt-1">
          вы
        </Text>
      ) : (
        <Pressable
          className="flex justify-center items-center ml-auto blue-color w-[63px] h-[25px] rounded-[5px] "
          disabled={isDeletingToken}
          onPress={() => deleteDevice()}
        >
          <Text
            className="text-[12px] text-white  font-semibold blue-color"
            disabled={isDeletingToken}
            onPress={() => deleteDevice()}
          >
            выйти
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default DeviceItem;
