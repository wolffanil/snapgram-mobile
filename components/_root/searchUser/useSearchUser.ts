import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useSearchForm } from "@/hooks/useSearchForm";
import { UserService } from "@/services/user.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";

export const useSearchUser = () => {
  const { user } = useAuth();
  const { searchTerm, debouncedValue, control } = useSearchForm();

  const { data: searchUsers, isPending: isSearchingUsers } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_USERS, debouncedValue],
    queryFn: () => UserService.getUsers(debouncedValue),
    enabled: !!debouncedValue,
    staleTime: 2 * 60 * 1000,
    select: (data) => data.filter((u) => u?._id !== user?._id),
  });

  const {
    data: users,
    isPending: isLoadingUsers,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => UserService.getUsers(),
    staleTime: 2 * 60 * 1000,

    select: (data) => data.filter((u) => u?._id !== user?._id),
  });

  return {
    searchTerm,
    control,
    isLoadingUsers,
    isSearchingUsers,
    users,
    searchUsers,
    refetch,
  };
};
