
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

const apiKey = import.meta.env.VITE_API_KEY

export const getAllNodes = () => {
    return api.get('/api/v1/nodes', {
        headers: {
            'x-api-key': apiKey
        }
    })
}

export const createNode = ({ source, chain, url }: { source: string, chain: string, url: string }) => {
    return api.post('/api/v1/nodes', {
        source,
        chain,
        url
    }, {
        headers: {
            'x-api-key': apiKey
        }
    })
}