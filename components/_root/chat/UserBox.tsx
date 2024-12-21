import { View, Text, Pressable, Image } from "react-native";
import React, { useCallback } from "react";
import { Link, router } from "expo-router";
import { formatDateString, getMedia, getСompanion } from "@/utils";
import { useAuth } from "@/providers/auth/AuthProvider";

const UserBox = () => {
  const { selectedChat, setSelectedChat, user } = useAuth();

  if (!selectedChat?._id) return;

  const n = getСompanion(selectedChat?.users || [], user?._id ?? "");

  const companion = selectedChat?.users[n];

  const handleBack = useCallback(() => {
    setSelectedChat(null);
    router.push("/(tabs)/chats");
  }, []);

  return (
    <View
      className="flex items-center flex-row
 gap-x-[20px] w-full max-w-full pl-3"
    >
      <View className="flex-center items-center flex-row">
        <Pressable
          className="mr-[6px] block w-[26px] h-[17px]"
          onPress={handleBack}
        >
          <Image
            source={require("@/public/assets/icons/back-chat.png")}
            alt="back"
            className="!w-[26px] !h-[17px]"
          />
        </Pressable>
        <Link href={`/(tabs)/profile/${companion._id}`}>
          <View className="relative w-[45px] flex-row">
            <Image
              source={{ uri: getMedia(companion?.imageUrl || "") }}
              alt="photoProfile"
              className="h-[45px] w-[45px] rounded-[43px]"
              style={{
                objectFit: "cover",
              }}
            />
            {companion?.isOnline && (
              <View className="absolute w-[15px] h-[15px] bg-[#00ff75] border-[1.5px] border-white right-0 bottom-0 rounded-[24px]" />
            )}
          </View>
        </Link>
      </View>
      <View className="flex flex-col justify-around items-start w-full">
        <Text className=" text-main-color font-bold text-[18px]">
          {companion?.name}
        </Text>
        <Text className="text-light-3 text-[12px]" numberOfLines={1}>
          {!selectedChat?.isTyping
            ? companion?.isOnline
              ? "Онлайн"
              : `был (a) в сети ${formatDateString(companion.updatedAt)}`
            : "Печетает..."}
        </Text>
      </View>
    </View>
  );
};

export default UserBox;
