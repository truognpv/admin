import { getAllNodes } from "@/services/node"

export const GET_ALL_NODES = 'GET_ALL_NODES'

export const useGetAllNodes = () => ({
    queryKey: [GET_ALL_NODES],
    queryFn: async () => {
        const data = await getAllNodes()
        return data.data
    }
})