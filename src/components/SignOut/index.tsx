import { cn } from '@/lib'
import { PoweroffOutlined } from '@ant-design/icons'

export const SignOut = ({ className, collapsed }: { className: string; collapsed: boolean }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-6 border-t-gray-300 z-10 border-solid border-t-[1px]',
        className,
        !collapsed ? 'flex-row' : 'flex-col'
      )}>
      <p>Admin</p>
      <button>
        <PoweroffOutlined />
      </button>
    </div>
  )
}
