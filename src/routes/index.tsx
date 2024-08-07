import { PageHeader } from '@/components/PageHeader'
import { createFileRoute } from '@tanstack/react-router'

const Index = () => {
  return (
    <div>
      <PageHeader title="Dashboard" />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
