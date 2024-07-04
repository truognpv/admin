import { PageHeader } from '@/components/PageHeader'
import { createFileRoute } from '@tanstack/react-router'

const ManageApi = () => {
  return (
    <div>
      <PageHeader title="Manage API" />
    </div>
  )
}

export const Route = createFileRoute('/manage-api/')({
  component: ManageApi,
})
