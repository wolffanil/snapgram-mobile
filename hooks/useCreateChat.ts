import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "../services/chat.service";
import { QUERY_KEYS } from "../shared/enums/queryKeys";
import { getErrorMessage } from "../services/api/getErrorMessage";
import { create } from "mutative";
import { useRouter } from "expo-router";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useToast } from "./useToast";

export const useCreateChat = (userId: string, name: string) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { handleShowToast } = useToast();
  const { setSelectedChat } = useAuth();

  const { mutateAsync: createChat, isPending: isCreatingChat } = useMutation({
    mutationKey: ["create chat"],
    mutationFn: () => ChatService.create(userId),

    onSuccess: (newChat: IChat) => {
      handleShowToast({
        type: "success",
        text1: `Связь с ${name} подключена`,
      });

      queryClient.setQueryData(
        [QUERY_KEYS.GET_MY_CHATS],
        (oldChats: IChat[]) => {
          if (!oldChats?.length) return [newChat];
          return create(oldChats, (draft) => {
            if (draft.find((chat) => chat._id === newChat._id)) return;
            return [newChat, ...oldChats];
          });
        }
      );
    },
    onError: (error: string) => {
      handleShowToast({
        type: "error",
        text1: getErrorMessage(error),
      });
    },
  });

  const handleCreateChat = async () => {
    const chats: IChat[] =
      queryClient.getQueryData([QUERY_KEYS.GET_MY_CHATS]) || [];

    if (chats?.length) {
      const existChat = chats.find((chat) =>
        chat.users.find((u) => u._id === userId)
      );
      if (existChat) {
        router.push("/(tabs)/chat");
        setSelectedChat(existChat);
        return;
      }
    }
    const newChat = await createChat();

    if (newChat) {
      router.push("/(tabs)/chat");
      setSelectedChat(newChat);
    }
  };

  return {
    handleCreateChat,
    isCreatingChat,
  };
};
