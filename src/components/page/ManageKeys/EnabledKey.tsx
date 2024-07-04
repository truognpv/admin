import { disabledKeys, enabledKeys } from '@/services/key'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message, Popconfirm, Select, Switch } from 'antd'
import { useState } from 'react'

export const EnabledKey = ({ enabled, id }: { enabled: boolean; id: number }) => {
  const [isEnabled, setIsEnabled] = useState(enabled)
  const [user, setUser] = useState('gnass')
  const queryClient = useQueryClient()

  const formatId = id
    .toString()
    .split(/[,\s]+/)
    .filter((node: string) => node.trim() !== '')
    .map((node: string) => Number(node))

  const onChange = async () => {
    setIsEnabled(!isEnabled)
    if (isEnabled) {
      await disabledKeys({ key_ids: formatId })
    } else {
      await enabledKeys({ key_ids: formatId, enabled_by: user })
    }
  }

  const { mutate } = useMutation({
    mutationFn: onChange,
    onSuccess: () => {
      if (isEnabled) {
        message.success('Key disabled successfully')
      } else {
        message.success('Key enabled successfully')
      }
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_KEYS'] })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      message.error(error?.response?.data?.error)
    },
  })

  const SelectUser = () => {
    return (
      <div className="flex items-center gap-1">
        <p className="text-base font-semibold">By:</p>
        <Select value={user} onChange={(user: string) => setUser(user)} className="w-full">
          <Select.Option value="gnass">Gnass</Select.Option>
          <Select.Option value="vietnk">Vietnk</Select.Option>
        </Select>
      </div>
    )
  }

  return (
    <Popconfirm
      title={`Are you sure ${isEnabled ? 'Disable' : 'Enable'} key ${id}?`}
      placement="topRight"
      onConfirm={() => mutate()}
      description={<SelectUser />}>
      <Switch checked={isEnabled} />
    </Popconfirm>
  )
}
