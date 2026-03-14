import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Header } from "@/features/core/components/header";
import { Footer } from "@/features/core/components/footer";

export const Route = createFileRoute("/(app)")({
    component: AppLayout,
});

function AppLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen flex-col">
            <Header
                onNavigate={(page) => {
                    void navigate({ to: page === "dashboard" ? "/dashboard" : "/profile" });
                }}
                onLogout={() => void navigate({ to: "/" })}
            />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
