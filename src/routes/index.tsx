import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  return <div className="p-6">Dashboard</div>
}

export const Route = createFileRoute('/')({
  component: Index,
})
