import { useQuery } from '@tanstack/react-query';
import { listPosts, type ListPostsParams } from '@/services/posts.service';

export function usePosts(params: ListPostsParams) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => listPosts(params),
  });
}