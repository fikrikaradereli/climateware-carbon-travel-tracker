import { useEffect } from "react";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { Header } from "@/features/core/components/header";
import { Footer } from "@/features/core/components/footer";
import { useAuthStore } from "@/features/auth/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)")({
    beforeLoad: () => {
        if (typeof window === "undefined") return;
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) {
            throw redirect({ to: "/login" });
        }
    },
    component: AppLayout,
});

function AppLayout() {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    useEffect(() => {
        if (!isAuthenticated) {
            void navigate({ to: "/login", replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="flex min-h-screen flex-col">
            <Header
                onNavigate={(page) => {
                    void navigate({ to: page === "dashboard" ? "/dashboard" : "/profile" });
                }}
                onLogout={() => {
                    const name = user?.firstName ?? "User";
                    logout();
                    toast.success(`Goodbye, ${name}! You have been logged out.`);
                    void navigate({ to: "/" });
                }}
            />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
