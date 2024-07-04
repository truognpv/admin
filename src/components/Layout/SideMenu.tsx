import {
  ApiOutlined,
  HomeOutlined,
  KeyOutlined,
  LeftOutlined,
  NodeIndexOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { Link, useRouter } from '@tanstack/react-router'
import { Button, Menu, MenuProps } from 'antd'
import { useState } from 'react'
import { cn } from '@/lib'
import Layout from 'antd/es/layout/layout'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '/',
    label: <Link to="/">Dashboard</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: '/manage-api',
    label: <Link to="/manage-api">Manage API</Link>,
    icon: <ApiOutlined />,
  },
  {
    key: '/manage-node',
    label: <Link to="/manage-node">Manage Node</Link>,
    icon: <NodeIndexOutlined />,
  },
  {
    key: '/manage-key',
    label: <Link to="/manage-key">Manage Key</Link>,
    icon: <KeyOutlined />,
  },
]

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const currentPage = router?.latestLocation?.pathname

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className={cn('min-h-screen relative', !collapsed ? 'w-[256px]' : 'w-auto')}>
      <Button
        onClick={toggleCollapsed}
        className={cn(
          'absolute top-1/2 left-[205px] w-10 h-10 rounded-full flex items-center justify-center',
          !collapsed ? 'left-[205px]' : 'left-[60px]'
        )}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={[currentPage]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className="h-full pt-4"
        defaultOpenKeys={[currentPage]}
      />
      {/* <div className="w-full absolute bottom-0">
        <SignOut className="w-full" collapsed={collapsed} />
      </div> */}
    </Layout>
  )
}
