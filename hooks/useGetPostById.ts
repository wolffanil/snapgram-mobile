import { PostService } from "@/services/post.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export const useGetPostById = () => {
  const { postId } = useLocalSearchParams();

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => PostService.getById(postId?.toString() || ""),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000,
  });

  return { post, isPostLoading };
};
