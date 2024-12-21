import { UserService } from "@/services/user.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export const useProfile = () => {
  const { profileId } = useLocalSearchParams();

  const {
    data: user,
    isPending: isLoadingUser,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, profileId],
    queryFn: () => UserService.getById(profileId.toString() || ""),
    staleTime: 1 * 60 * 1000,
    enabled: !!profileId,
  });

  return {
    user,
    isLoadingUser,
    refetch,
  };
};
