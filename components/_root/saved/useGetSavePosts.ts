import { SaveService } from "@/services/save.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetSave = () => {
  const {
    data: saves,
    isPending: isLoadingSaves,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER_SAVES],
    queryFn: () => SaveService.getAll(),
    staleTime: 1 * 60 * 1000,
    select: (data) => data.map((item: { post: IPost }) => item.post),
  });

  return { saves, isLoadingSaves, refetch };
};
