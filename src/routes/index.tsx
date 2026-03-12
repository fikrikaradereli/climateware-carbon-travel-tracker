import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <h1 className="text-5xl font-bold text-center mt-8">
      Climateware - Carbon Travel Tracker
    </h1>
  )
}
