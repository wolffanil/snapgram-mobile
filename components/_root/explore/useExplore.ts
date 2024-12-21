import { useSearchForm } from "@/hooks/useSearchForm";
import { PostService } from "@/services/post.service";
import { QUERY_KEYS } from "@/shared/enums/queryKeys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useExplore = () => {
  const { control, debouncedValue, searchTerm } = useSearchForm();

  const { data: searchPosts, isPending: isSearchingPosts } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, debouncedValue],
    queryFn: () => PostService.search(debouncedValue),
    enabled: !!debouncedValue,
  });

  const {
    hasNextPage,
    data: posts,
    fetchNextPage,
    isPending: isLoadingPosts,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam = 1 }) => PostService.getAll({ pageParam }),
    getNextPageParam: (lastPage, _allPages) => {
      return lastPage.posts.length > 0 ? lastPage.page + 1 : null;
    },
    initialPageParam: 1,
    staleTime: 1 * 60 * 1000,
  });

  const shouldShowPosts =
    searchTerm && posts?.pages.every((item) => item?.posts?.length === 0);

  return {
    hasNextPage,
    isLoadingPosts,
    isSearchingPosts,
    posts,
    searchPosts,
    shouldShowPosts,
    control,
    searchTerm,
    fetchNextPage,
    refetch,
  };
};
