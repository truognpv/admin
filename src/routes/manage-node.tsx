import { PageHeader } from '@/components/PageHeader'
import { AddNewNode } from '@/components/page/ManageNode/AddNewNode'
import { useGetAllNodes } from '@/query/node'

import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Table } from 'antd'
import { upperCase, upperFirst } from 'lodash'

const columns = [
  {
    key: 'index',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'created_at',
    render: (created_at: string) => {
      return created_at.split('T')[0]
    },
  },
  {
    title: 'Chain',
    key: 'chain',
    dataIndex: 'chain',
    render: (chain: string) => {
      return <div>{upperCase(chain)}</div>
    },
  },
  {
    key: 'source',
    title: 'Source',
    dataIndex: 'source',
    render: (source: string) => {
      return <div>{upperFirst(source)}</div>
    },
  },
  {
    key: 'url',
    title: 'Url',
    dataIndex: 'url',
    render: (url: string) => {
      return (
        <Link to={url} className="text-blue-600">
          {url}
        </Link>
      )
    },
  },
  {
    key: 'time',
    title: 'Sleep Time',
    dataIndex: 'time',
    render: (time: string) => {
      return <div>{time}</div>
    },
  },
  // {
  //   key: 'action',
  //   title: 'Action',
  //   render: (record: NodeType) => {
  //     return <ActionMangeNode record={record} />
  //   },
  // },
]

const ManageNodePage = () => {
  const allNodesQuery = useQuery(useGetAllNodes())

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg bg-white">
      <PageHeader title="Manage Node">
        <AddNewNode />
      </PageHeader>

      <Table
        dataSource={allNodesQuery.data}
        columns={columns}
        bordered
        size="small"
        loading={allNodesQuery.isFetching}
        pagination={false}
      />
    </div>
  )
}

export const Route = createFileRoute('/manage-node')({
  component: ManageNodePage,
})
