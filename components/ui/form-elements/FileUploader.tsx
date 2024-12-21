import { Fragment, useState } from "react";

import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { getMedia } from "@/utils";
import { launchGallery } from "@/utils/LibraryHelpers";

interface IFileUploader {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: IFileUploader) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const selectedFile = async () => {
    const res = await launchGallery();
    if (!res?.uri) return;
    fieldChange([res]);
    setFileUrl(res.uri);
  };

  return (
    <View className="flex-1">
      {fileUrl ? (
        <Fragment>
          <View className="flex flex-1 justify-center w-full p-5 ">
            <Image
              source={{
                uri: fileUrl?.split("/")?.includes("upload")
                  ? getMedia(fileUrl)
                  : fileUrl,
              }}
              className="file_uploader-img object-cove"
            />
          </View>
          <Pressable onPress={selectedFile}>
            <Text className="file_uploader-label text-main-color">
              Нажмите чтобы заменить фото.
            </Text>
          </Pressable>
        </Fragment>
      ) : (
        <View className="file_uploader-box bg-second-color rounded-[14px]">
          <Image
            source={require("@/public/assets/icons/file-upload.png")}
            className="w-[96px] h-[77px] object-cover"
          />

          <Text className="text-light-4 small-regular mb-6">SVG, PNG, JPG</Text>

          <TouchableOpacity
            onPress={selectedFile}
            className="shad-button_dark_4 text-main-color bg-main-color flex-center rounded-[10px] "
          >
            <Text className="text-main-color">Выбрать с телефона</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FileUploader;
