import { useQueryClient } from "@tanstack/react-query"

export const useGetFetchQuery = async (key: any) => {
  const queryClient = useQueryClient()
  const data = await queryClient.fetchQuery([key])

  return data
}
