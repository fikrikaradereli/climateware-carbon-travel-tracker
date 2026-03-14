import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { loginSchema } from "@/features/auth/schemas";
import { loginFn } from "@/features/auth/server-functions";
import { useAuthStore } from "@/features/auth/auth-store";
import { TextField } from "@/features/core/components/ui/text-field";
import { Button } from "@/features/core/components/ui/button";
import { Icon } from "@/features/core/components/ui/icon";
import { SocialIcon } from "@/features/core/components/ui/social-icon";

export function LoginForm() {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const user = await loginFn({ data: value });
                setUser(user);
                toast.success(`Welcome back, ${user.firstName}!`);
                await router.navigate({ to: "/dashboard" });
            } catch (e) {
                setServerError(e instanceof Error ? e.message : "An error occurred.");
            }
        },
    });

    return (
        <div className="w-full max-w-104">
            <h2 className="text-cw-dark-blue-100 mb-4 text-[32px] font-bold">Welcome</h2>

            {/* Card */}
            <div className="rounded-2xl bg-[#F5F5F5] p-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        void form.handleSubmit();
                    }}
                    className="flex flex-col gap-4"
                >
                    {/* Email */}
                    <form.Field name="email">
                        {(field) => (
                            <TextField
                                type="email"
                                placeholder="Email"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                error={field.state.meta.errors[0]?.message}
                            />
                        )}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => (
                            <TextField
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                error={field.state.meta.errors[0]?.message}
                                rightAddon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="text-cw-dark-blue-100/50 hover:text-cw-dark-blue-100 flex items-center"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        <Icon name={showPassword ? "eye-off" : "eye-on"} size={20} />
                                    </button>
                                }
                            />
                        )}
                    </form.Field>

                    {serverError && <p className="text-sm text-cw-red-100">{serverError}</p>}

                    <form.Subscribe selector={(s) => s.isSubmitting}>
                        {(isSubmitting) => (
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isSubmitting}
                                className="w-full lg:w-auto lg:self-start"
                            >
                                {isSubmitting ? "Signing in..." : "Login"}
                            </Button>
                        )}
                    </form.Subscribe>

                    {/* Social */}
                    <div className="flex flex-col gap-3">
                        <p className="text-cw-dark-blue-100 text-sm font-semibold">Or continue with</p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="border-cw-grey-100 flex h-10 w-17 items-center justify-center rounded-lg border bg-white hover:bg-gray-50"
                                aria-label="Continue with Google"
                            >
                                <SocialIcon provider="google" size={20} />
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-17 items-center justify-center rounded-lg bg-[#3875EA] hover:bg-[#2d64d3]"
                                aria-label="Continue with Facebook"
                            >
                                <SocialIcon provider="facebook" size={20} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Below card */}
            <p className="text-cw-dark-blue-100/60 mt-4 text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-cw-dark-blue-100 font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
