import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/enums/queryKeys";
import { PostService } from "../../../services/post.service";

export const useHome = () => {
  const {
    data: posts,
    fetchNextPage,
    isLoading,
    hasNextPage,
    refetch,
    error: isErrorPosts,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam = 1 }) => PostService.getAll({ pageParam }),
    getNextPageParam: (lastPage, _allPages) => {
      return lastPage.posts.length > 0 ? lastPage.page + 1 : null;
    },
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
  });

  return {
    posts,
    isErrorPosts,
    hasNextPage,
    fetchNextPage,
    isLoading,
    refetch,
  };
};
