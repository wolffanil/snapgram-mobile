import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

enum EnumSecureStorage {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const getAccessToken = async () => {
  const accessToken = await getItemAsync(EnumSecureStorage.ACCESS_TOKEN);
  return accessToken || null;
};

export const getRefreshToken = async () => {
  const refreshToken = await getItemAsync(EnumSecureStorage.REFRESH_TOKEN);

  return refreshToken || null;
};

export const saveTokensStorage = async (data: ITokens) => {
  await setItemAsync(EnumSecureStorage.ACCESS_TOKEN, data.accessToken);
  await setItemAsync(EnumSecureStorage.REFRESH_TOKEN, data.refreshToken);
};

export const deleteTokens = async () => {
  await deleteItemAsync(EnumSecureStorage.ACCESS_TOKEN);
  await deleteItemAsync(EnumSecureStorage.REFRESH_TOKEN);
};
