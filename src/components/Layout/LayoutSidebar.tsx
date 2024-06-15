import { ReactNode } from '@tanstack/react-router'
import { Layout } from 'antd'
import { SideMenu } from './SideMenu'

export const LayoutSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className="flex flex-row min-h-screen relative">
      <SideMenu />

      <div className="p-6 w-full">{children}</div>
    </Layout>
  )
}
