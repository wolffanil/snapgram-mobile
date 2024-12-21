import { useAuth } from "@/providers/auth/AuthProvider";
import { SubscribeService } from "@/services/subscribe.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useGetSubscriptions() {
  const { user } = useAuth();
  const { profileId } = useLocalSearchParams<{ profileId: string }>();

  const { data: subscriptions, isPending: isLoadingSubscriptions } = useQuery({
    queryKey: [QUERY_KEYS.GET_SUBSCRIPTIONS_BY_USERID, profileId || user?._id],
    queryFn: () =>
      SubscribeService.getSubscriptions(
        profileId === user?._id ? "" : profileId
      ),
    staleTime: 2 * 60 * 1000,
  });

  return {
    subscriptions,
    isLoadingSubscriptions,
  };
}
