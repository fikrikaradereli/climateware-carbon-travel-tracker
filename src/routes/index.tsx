import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
    return <h1 className="mt-8 text-center text-5xl font-bold">Climateware - Carbon Travel Tracker</h1>;
}
