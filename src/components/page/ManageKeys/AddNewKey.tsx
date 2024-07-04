import { useGetAllNodes } from '@/query/node'
import { createKey } from '@/services/key'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Select, message } from 'antd'
import { useToggle } from 'react-use'

export const AddNewKey = () => {
  const [form] = Form.useForm()
  const [on, toggle] = useToggle(false)
  const queryClient = useQueryClient()

  const allNodesQuery = useQuery(useGetAllNodes())

  const listKeyIds = allNodesQuery.data?.map((key: { id: number }) => key.id)

  const handleAddNode = async () => {
    const values = await form.validateFields()
    const { key, node_ids } = values

    await createKey({ key, node_ids })
  }

  const { mutate } = useMutation({
    mutationFn: handleAddNode,
    onSuccess: () => {
      toggle()
      form.resetFields()
      message.success('Key added successfully')
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_KEYS'] })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      message.error(error?.response?.data?.error)
    },
  })

  const handleCancel = () => {
    toggle()
    form.resetFields()
  }

  return (
    <div>
      <Button onClick={toggle} type="primary">
        Add New Key
      </Button>

      <Modal open={on} onCancel={handleCancel} onOk={() => mutate()} title="Add New Key">
        <Form
          layout="horizontal"
          labelCol={{ span: 4 }}
          form={form}
          onFinish={() => console.log(form)}>
          <Form.Item label="Key" name="key">
            <Input placeholder="Enter key" />
          </Form.Item>
          <Form.Item label="Node Ids" name="node_ids">
            <Select placeholder="Select Key Ids">
              {listKeyIds?.map((id: number) => (
                <Select.Option key={id} value={id}>
                  {id}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
