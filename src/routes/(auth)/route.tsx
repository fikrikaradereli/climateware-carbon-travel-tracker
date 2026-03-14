import { useEffect } from "react";
import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/features/core/components/ui/button";
import { useAuthStore } from "@/features/auth/auth-store";

export const Route = createFileRoute("/(auth)")({
    beforeLoad: () => {
        if (typeof window === "undefined") return;
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
            throw redirect({ to: "/dashboard" });
        }
    },
    component: AuthLayout,
});

function AuthLayout() {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            void navigate({ to: "/dashboard", replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return null;

    return (
        <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row">
            {/* Left panel */}
            <div className="bg-cw-dark-blue-100 flex shrink-0 flex-col lg:h-full lg:w-1/2">
                <div className="shrink-0 p-6 lg:pt-20 lg:pr-8 lg:pb-8 lg:pl-[33%]">
                    <Button variant="outline" onClick={() => void navigate({ to: "/" })}>
                        Back
                    </Button>
                </div>

                <div className="hidden flex-1 overflow-hidden lg:block lg:pr-[8%] lg:pl-[38%]">
                    <img
                        src="/auth-image.png"
                        alt="Carbon travel illustration"
                        className="h-full w-full object-contain object-bottom-right"
                    />
                </div>

                <div className="shrink-0 px-6 pb-6 lg:pr-8 lg:pb-[15%] lg:pl-[44%]">
                    <h1 className="font-montserrat text-[40px] leading-none font-bold text-[#FFFDF4] lg:text-[clamp(40px,3.65vw,70px)]">
                        Stay Connected.
                    </h1>
                </div>
            </div>

            <div className="flex flex-1 items-start justify-center overflow-y-auto p-8 lg:items-center">
                <Outlet />
            </div>
        </div>
    );
}
