import { createNode } from '@/services/node'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, Select, message } from 'antd'
import { useToggle } from 'react-use'

export const AddNewNode = () => {
  const [form] = Form.useForm()
  const [on, toggle] = useToggle(false)
  const queryClient = useQueryClient()

  const handleAddNode = async () => {
    const values = await form.validateFields()
    const { chain, source, url } = values
    await createNode({ source, chain, url })
  }

  const { mutate } = useMutation({
    mutationFn: handleAddNode,
    onSuccess: () => {
      toggle()
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_NODES'] })
      message.success('Node added successfully')
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      message.error(error?.response?.data?.error)
    },
  })

  const handleCancel = () => {
    toggle()
  }

  return (
    <div>
      <Button onClick={toggle} type="primary">
        Add New Node
      </Button>

      <Modal open={on} onCancel={handleCancel} onOk={() => mutate()} title="Add New Node">
        <Form layout="horizontal" labelCol={{ span: 4 }} form={form}>
          <Form.Item label="Chain" name="chain">
            <Select placeholder="Select Chain">
              <Select.Option value="bsc">BSC</Select.Option>
              <Select.Option value="eth">ETH</Select.Option>
              <Select.Option value="sol">SOL</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Source" name="source">
            <Input placeholder="Enter source" />
          </Form.Item>
          <Form.Item label="Url" name="url">
            <Input placeholder="Enter url" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
