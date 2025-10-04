import React from 'react'
import router from './routes';
import { RouterProvider } from 'react-router-dom';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




export default function App() {
  const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

       <RouterProvider router={router} />
      </QueryClientProvider>
  )
}
