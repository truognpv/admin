import { PageHeader } from '@/components/PageHeader'
import { AddNewKey } from '@/components/page/ManageKeys/AddNewKey'
import { EnabledKey } from '@/components/page/ManageKeys/EnabledKey'
import { useGetAllKeys } from '@/query/key'
import { KeyProps } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Table, Tag } from 'antd'
import dayjs from 'dayjs'
import { upperCase, upperFirst } from 'lodash'
import { useMemo } from 'react'

type DataFormat = {
  chain?: string
  created_at: string
  enabled: boolean
  enabled_by: string
  id: number
  idNode?: number
  key: string
  last_disabled_at: string
  note: string
  source?: string
  updated_at: string
  url?: string
}

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at: string) => {
      return dayjs(created_at).format('DD/MM/YYYY')
    },
  },
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
    render: (key: string, record: DataFormat) => {
      const isEnable = record.enabled
      return <Tag color={isEnable ? 'green' : 'red'}>{key}</Tag>
    },
  },
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'Chain',
    dataIndex: 'chain',
    key: 'chain',
    render: (chain: string) => {
      return upperCase(chain)
    },
  },
  {
    title: 'Node ID',
    dataIndex: 'idNode',
    key: 'idNode',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: (url: string) => {
      return (
        <Link to={url} className="text-blue-500">
          {url}
        </Link>
      )
    },
  },
  {
    title: 'Enabled By',
    dataIndex: 'enabled_by',
    key: 'enabled_by',
    render: (enabled_by: string) => upperFirst(enabled_by),
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    render: (enabled: boolean, record: DataFormat) => {
      return <EnabledKey enabled={enabled} id={record.id} />
    },
  },
]

const ManageKeyPage = () => {
  const listKeys = useQuery(useGetAllKeys())

  const formatData = useMemo(() => {
    const result: DataFormat[] = []

    listKeys?.data?.map((item: KeyProps) => {
      const { nodes, ...props } = item
      nodes?.map((node) => {
        result.push({
          chain: node.chain,
          source: node.source,
          url: node.url,
          idNode: node.id,
          ...props,
        })
      })
    })
    return result
  }, [listKeys?.data])

  return (
    <div className="flex flex-col gap-4 p-4  bg-white rounded-lg">
      <PageHeader title="Manage Key">
        <AddNewKey />
      </PageHeader>

      <Table dataSource={formatData} columns={columns} size="small" bordered pagination={false} />
    </div>
  )
}

export const Route = createFileRoute('/manage-key')({
  component: ManageKeyPage,
})
