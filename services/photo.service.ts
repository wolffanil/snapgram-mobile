import { getPhotoUrl } from "../config/api.config";

import { request } from "./api/reguest.api";

export const PhotoService = {
  async uploadPhoto(file: FormData, folder: folderPath) {
    return request<{ imageUrl: string }>({
      url: getPhotoUrl("/uploadPhoto"),
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      params: { folder },
      data: file,
    });
  },

  async deletePhoto(name: string, folder: folderPath) {
    return request<{ status: string }>({
      url: getPhotoUrl(`/deletePhoto/${name}`),
      method: "DELETE",
      params: { folder },
    });
  },
};
