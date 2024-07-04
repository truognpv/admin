import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})
const apiKey = import.meta.env.VITE_API_KEY

export const getAllKeys = () => {
    return api.get('/api/v1/keys', {
        headers: {
            'x-api-key': apiKey,
        },
    })
}

export const createKey = ({ key, node_ids }: { key: string; node_ids: number[] }) => {
    return api.post(
        '/api/v1/keys',
        {
            key,
            node_ids,
        },
        {
            headers: {
                'x-api-key': apiKey,
            },
        }
    )
}

export const enabledKeys = ({ key_ids, enabled_by }: { key_ids: number[]; enabled_by: string }) => {
    return api.post('/api/v1/keys/enable', {
        key_ids,
        enabled_by,
    },
        {
            headers: {
                'x-api-key': apiKey,
            },
        })
}

export const disabledKeys = ({ key_ids }: { key_ids: number[] }) => {
    return api.post('/api/v1/keys/disable', {
        key_ids,
    },
        {
            headers: {
                'x-api-key': apiKey,
            },
        })
}
