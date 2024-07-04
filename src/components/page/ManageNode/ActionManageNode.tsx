import { NodeType } from '@/types'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Form, Input, Modal } from 'antd'
import { useToggle } from 'react-use'

export const ActionMangeNode = ({ record }: { record: NodeType }) => {
  const [on, toggle] = useToggle(false)

  return (
    <div className="flex items-center gap-4">
      <FormOutlined
        className="text-blue-500 hover:scale-125 cursor-pointer transition-all duration-300 ease-in-out"
        onClick={toggle}
      />
      <DeleteOutlined className="text-red-500 hover:scale-125 cursor-pointer transition-all duration-300 ease-in-out" />
      <Modal open={on} onCancel={toggle} title="Edit Node">
        <Form layout="horizontal" labelCol={{ span: 4 }} initialValues={record}>
          <Form.Item label="Node" name="node">
            <Input />
          </Form.Item>
          <Form.Item label="Source" name="source">
            <Input />
          </Form.Item>
          <Form.Item label="Url" name="url">
            <Input />
          </Form.Item>
          <Form.Item label="Sleep Time" name="time">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
