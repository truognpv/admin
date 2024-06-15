import { LayoutSidebar } from '@/components/Layout/LayoutSidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Component,
})

function Component() {
  return (
    <div className="w-full min-h-screen">
      <LayoutSidebar>
        <Outlet />
      </LayoutSidebar>
    </div>
  )
}
