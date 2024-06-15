import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage-api')({
  component: ManageApi,
})

function ManageApi() {
  return <div>Manage API</div>
}
