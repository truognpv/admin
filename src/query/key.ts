import { getAllKeys } from "@/services/key"

export const GET_ALL_KEYS = 'GET_ALL_KEYS'

export const useGetAllKeys = () => ({
    queryKey: [GET_ALL_KEYS],
    queryFn: async () => {
        const data = await getAllKeys()
        return data.data
    }
})