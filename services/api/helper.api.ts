import axios from "axios";
import * as Device from "expo-device";
import { getRefreshToken, saveTokensStorage } from "../auth/auth.helper";
import { getMyIp } from "./getMyIp";
import { API_URL, getAuthUrl } from "@/config/api.config";

export const getNewTokens = async () => {
  try {
    const ip = await getMyIp();
    const refreshToken = await getRefreshToken();
    const response = await axios.post<string, { data: IAuthResponse }>(
      API_URL + getAuthUrl("/refresh"),
      { ip, refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          type: "mobile",
          brand: Device?.brand || "none",
          model: Device?.modelName || "none",
          device: Device?.osName || "none",
        },
      }
    );

    if (response.data.accessToken)
      saveTokensStorage({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

    return response;
  } catch (error) {}
};
