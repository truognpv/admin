export interface NodeType {
    chain?: string
    created_at?: string
    id: number
    source?: string
    updated_at: string
    url?: string
}

export interface KeyProps {
    created_at: string
    enabled: boolean
    enabled_by: string
    id: number
    key: string
    last_disabled_at: string
    nodes: NodeType[]
    note: string
    updated_at: string
}
