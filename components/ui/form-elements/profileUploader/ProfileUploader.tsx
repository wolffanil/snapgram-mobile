import { View, Text, Image, Pressable } from "react-native";
import React, { FC, useState } from "react";
import { launchGallery } from "@/utils/LibraryHelpers";
import { IProfileUploader } from "./profileUploader.interface";
import { getMedia } from "@/utils";

const ProfileUploader: FC<IProfileUploader> = ({ fieldChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const selectedFile = async () => {
    const res = await launchGallery();
    if (!res?.uri) return;
    fieldChange([res]);
    setFileUrl(res.uri);
  };
  return (
    <View className="w-full  h-[100px]">
      <View className=" flex-center gap-4 flex-row flex-1">
        <Image
          source={{
            uri: fileUrl?.split("/")?.includes("upload")
              ? getMedia(fileUrl)
              : fileUrl || getMedia("upload/profile/default.png"),
          }}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />

        <Pressable onPress={selectedFile}>
          <Text className="text-[#0095f6] small-regular md:base-semibold">
            Изменить фотографию профиля
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileUploader;
