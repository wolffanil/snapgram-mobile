import axios from "axios";
import { errorCatch } from "./error.api";
import { getNewTokens } from "./helper.api";
import { deleteTokens, getAccessToken } from "../auth/auth.helper";
import { API_URL } from "@/config/api.config";
import * as Device from "expo-device";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    type: "mobile",
    brand: Device?.brand || "none",
    model: Device?.modelName || "none",
    device: Device?.osName || "none",
  },
});

instance.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        error.response.data.message === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        //@ts-ignore
        if (error.response.status === 401) deleteTokens();
      }
    }
  }
);

export default instance;
