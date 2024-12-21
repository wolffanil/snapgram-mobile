import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscribeService } from "@/services/subscribe.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { create } from "mutative";
import { useMemo } from "react";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useLocalSearchParams } from "expo-router";

export function useSubscribe(action: "subscribe" | "unSubscribe") {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { profileId } = useLocalSearchParams<{ profileId: string }>();

  const { mutate: subscribe, isPending: isLoadingSubscribe } = useMutation({
    mutationKey: ["subscribe"],
    mutationFn: () => SubscribeService.subscribe(profileId || ""),
    onSuccess() {
      const currentUser: IUser | undefined = queryClient.getQueryData([
        QUERY_KEYS.GET_USER_BY_ID,
        profileId,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_SUBSCRIBERS_BY_USERID, profileId],
        (subscribers: ISubscribe[]) => {
          if (!subscribers?.length)
            return [
              {
                userId: profileId,
                subscriberId: {
                  _id: user?._id,
                  name: user?.name || "user",
                  imageUrl: user?.imageUrl,
                },
              },
            ];

          return create(subscribers, (draft) => {
            draft.push({
              subscriberId: {
                _id: user?._id || "",
                name: user?.name || "user",
                imageUrl: user?.imageUrl || "",
              },
              userId: {
                _id: profileId || "",
                imageUrl: "",
                name: "",
              },
            });
          });
        }
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_SUBSCRIPTIONS_BY_USERID, user?._id],
        (subscriptions: ISubscribe[]) => {
          if (!subscriptions?.length)
            return [
              {
                subscriberId: user?._id,
                userId: {
                  _id: profileId || "",
                  imageUrl: currentUser?.imageUrl || "",
                  name: currentUser?.name || "user",
                },
              },
            ];

          return create(subscriptions, (draft) => {
            draft.push({
              subscriberId: {
                _id: user?._id || "",
                name: user?.name || "user",
                imageUrl: user?.imageUrl || "",
              },
              userId: {
                _id: profileId || "",
                imageUrl: currentUser?.imageUrl || "",
                name: currentUser?.name || "user",
              },
            });
          });
        }
      );
    },
  });

  const { mutate: unSubscribe, isPending: isLoadingUnSubscribe } = useMutation({
    mutationKey: ["delete subscribe"],
    mutationFn: () => SubscribeService.deleteSubscribe(profileId || ""),
    onSuccess() {
      queryClient.setQueryData(
        [QUERY_KEYS.GET_SUBSCRIBERS_BY_USERID, profileId],
        (subscribers: ISubscribe[]) => {
          if (!subscribers?.length) return [];
          return subscribers.filter(
            (sub) => sub.subscriberId._id !== user?._id
          );
        }
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_SUBSCRIPTIONS_BY_USERID, user?._id],
        (subscriptions: ISubscribe[]) => {
          if (!subscriptions?.length) return [];

          return subscriptions.filter((sub) => sub.userId._id !== profileId);
        }
      );
    },
  });

  const actionButton = () =>
    action === "subscribe" ? subscribe() : unSubscribe();

  return useMemo(
    () => ({
      actionButton,
      isLoading: isLoadingSubscribe || isLoadingUnSubscribe,
    }),
    [actionButton, isLoadingSubscribe, isLoadingUnSubscribe]
  );
}
