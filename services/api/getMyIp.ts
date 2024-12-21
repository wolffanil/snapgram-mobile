import * as Network from "expo-network";

export const getMyIp = async () => {
  const ipAddress = await Network.getIpAddressAsync();

  return ipAddress;
};
