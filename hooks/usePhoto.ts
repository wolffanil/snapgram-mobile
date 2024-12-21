import { useMemo } from "react";
import { PhotoService } from "../services/photo.service";

export const usePhoto = (folder: folderPath) => {
  const uploadPhoto = async (file: any) => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: file[0].uri,
        type: "image/jpeg",
        name: "photo.jpg",
      } as unknown as Blob);
      const { imageUrl } = await PhotoService.uploadPhoto(formData, folder);
      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhoto = (name: string) => {
    if (!name) return;
    PhotoService.deletePhoto(name, folder);
    return { status: "seccuss" };
  };

  return useMemo(
    () => ({
      uploadPhoto,
      deletePhoto,
    }),
    [deletePhoto, uploadPhoto]
  );
};
