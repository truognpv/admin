import { BranchesOutlined, HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Button, Menu, MenuProps } from 'antd'
import { SignOut } from '../SignOut'
import { useState } from 'react'
import { cn } from '@/lib'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'dashboard',
    label: <Link to="/">Dashboard</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: 'manage-api',
    label: 'Manage Api',
    icon: <BranchesOutlined />,
    children: [
      {
        key: 'bol',
        label: <Link to="/">Bol Trade</Link>,
      },
      {
        key: 'kaivest',
        label: <Link to="/">Kaivest</Link>,
      },
    ],
  },
]

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  return (
    <div className="w-[256px] min-h-screen relative">
      <Button
        type="primary"
        ghost
        onClick={toggleCollapsed}
        className={cn(
          'absolute top-10 left-[205px] w-10 h-10 rounded-full flex items-center justify-center',
          !collapsed ? 'left-[205px]' : 'left-[60px]'
        )}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onClick}
        className="h-full pt-20"
      />
      <div className="w-full absolute bottom-0">
        <SignOut className="w-full" />
      </div>
    </div>
  )
}
