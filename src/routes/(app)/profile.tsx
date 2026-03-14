import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/profile")({
    component: ProfilePage,
});

function ProfilePage() {
    return <h1>Profile</h1>;
}
