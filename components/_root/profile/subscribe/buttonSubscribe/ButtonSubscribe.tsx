import { useAuth } from "@/providers/auth/AuthProvider";
import { useGetSubscribers } from "../useGetSubscribers";
import { useSubscribe } from "./useSubscribe";
import { Text, TouchableOpacity } from "react-native";

function ButtonSubscribe() {
  const { user } = useAuth();

  const { subscribers, isLoadingSubscribers } = useGetSubscribers();

  let action: "subscribe" | "unSubscribe";

  if (
    subscribers &&
    subscribers.some((sub) => sub.subscriberId?._id === user?._id)
  ) {
    action = "unSubscribe";
  } else {
    action = "subscribe";
  }

  const { actionButton, isLoading } = useSubscribe(action);

  return (
    <TouchableOpacity
      className="h-[37px] blue-color  px-[42px]  flex-center gap-2 rounded-lg"
      onPress={actionButton}
      disabled={isLoadingSubscribers || isLoading}
      activeOpacity={0.5}
    >
      <Text className="text-white text-[14px]">
        {action === "subscribe" ? "Подписаться" : "Отписаться"}
      </Text>
    </TouchableOpacity>
  );
}

export default ButtonSubscribe;
