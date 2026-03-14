import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const Route = createFileRoute("/(auth)/signup")({
    component: SignUpPage,
});

function SignUpPage() {
    return <SignUpForm />;
}
