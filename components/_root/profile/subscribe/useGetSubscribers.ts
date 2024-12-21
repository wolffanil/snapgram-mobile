import { useAuth } from "@/providers/auth/AuthProvider";
import { SubscribeService } from "@/services/subscribe.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useGetSubscribers() {
  const { user } = useAuth();
  const { profileId } = useLocalSearchParams<{ profileId: string }>();

  const { data: subscribers, isPending: isLoadingSubscribers } = useQuery({
    queryKey: [QUERY_KEYS.GET_SUBSCRIBERS_BY_USERID, profileId || user?._id],
    queryFn: () => SubscribeService.getSubscribers(profileId),
    staleTime: 2 * 60 * 1000,
  });

  return {
    subscribers,
    isLoadingSubscribers,
  };
}
