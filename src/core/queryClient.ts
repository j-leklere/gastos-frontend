import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      gcTime: 3600000,
      refetchOnWindowFocus: false
    },
    mutations: { retry: 0 }
  }
});
