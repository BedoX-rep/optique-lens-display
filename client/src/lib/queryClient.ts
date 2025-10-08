
import { QueryClient } from "@tanstack/react-query";

async function defaultFetcher<T>(url: string): Promise<T> {
  console.log(`[QueryClient] Fetching: ${url}`);
  
  try {
    const response = await fetch(url, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`[QueryClient] Response for ${url}: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const error = await response.text();
      console.error(`[QueryClient] Error response for ${url}:`, error);
      throw new Error(`API Error (${response.status}): ${error}`);
    }

    const data = await response.json();
    console.log(`[QueryClient] Success for ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`[QueryClient] Fetch failed for ${url}:`, error);
    throw error;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        console.log(`[QueryClient] Query registered:`, queryKey);
        return defaultFetcher(url);
      },
      staleTime: 1000 * 60 * 5, // 5 minutes - match Vercel
      retry: 1,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: false, // Prevent refetch on component mount
    },
  },
});

console.log('[QueryClient] Initialized');
