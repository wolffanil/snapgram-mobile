import { Href, router } from "expo-router";
import { launchImageLibraryAsync } from "expo-image-picker";

export const resetAndNavigate = (newPath: Href) => {
  if (router.canGoBack()) {
    router.dismissAll();
  }
  router.replace(newPath);
};

export const launchGallery = async (): Promise<any> => {
  try {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      return {
        uri: result.assets[0].uri,
        filename: result.assets[0].fileName,
        type: result.assets[0].mimeType,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
