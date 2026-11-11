import { createFileRoute } from '@tanstack/react-router'
import { HorizonWebsite } from '../components/horizon3d/HorizonWebsite'

export const Route = createFileRoute('/download/studio')({
  component: RouteComponent,
})

function RouteComponent() {
  return <HorizonWebsite />
}
