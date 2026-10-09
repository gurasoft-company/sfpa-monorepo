import { useQuery } from '@tanstack/react-query';
import { listProjects, type ListProjectsParams } from '@/services/projects.service';

export function useProjects(params: ListProjectsParams) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => listProjects(params),
  });
}