import { getAuthUrl } from "../../config/api.config";

import { getMyIp } from "../api/getMyIp";
import { request } from "../api/reguest.api";
import { deleteTokens, saveTokensStorage } from "./auth.helper";

export const AuthService = {
  async register(data: IRegister) {
    const ip = await getMyIp();

    let response = await request<IAuthResponse>({
      url: getAuthUrl("/register"),
      method: "POST",
      data: {
        ...data,
        ip,
      },
    });

    if (response.accessToken)
      saveTokensStorage({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

    return response;
  },

  async login(data: ILogin) {
    const ip = await getMyIp();
    const response = await request<IAuthResponse>({
      url: getAuthUrl("/login"),
      method: "POST",
      data: {
        ...data,
        ip,
      },
    });

    if (response?.accessToken) {
      saveTokensStorage({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
    }
    return response;
  },

  async generateQrToken() {
    return request<IQrToken>({
      url: getAuthUrl("/generate-token"),
      method: "POST",
    });
  },

  async scanToken(token: string) {
    const ip = await getMyIp();

    const response = await request<IAuthResponse>({
      url: getAuthUrl("/scan-token"),
      method: "POST",
      data: {
        token,
        ip,
      },
    });

    if (response?.accessToken) {
      saveTokensStorage({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
    }
    return response;
  },

  async resetCode(data: IResetCode) {
    await request({
      url: getAuthUrl("/reset-code"),
      method: "POST",
      data,
    });
  },

  async forgotPassword(data: IForgotPassword) {
    await request({
      url: getAuthUrl("/forgot-password"),
      method: "POST",
      data,
    });
  },

  async resetPassword(data: IResetPassword) {
    const response = await request<IResResetPassword>({
      url: getAuthUrl("/reset-password"),
      method: "POST",
      data,
    });

    return response;
  },

  async logout() {
    await request({
      url: getAuthUrl("/logout"),
      method: "POST",
    });
    deleteTokens();

    return;
  },
};
