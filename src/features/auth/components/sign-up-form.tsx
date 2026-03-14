import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { signUpSchema } from "@/features/auth/schemas";
import { signUpFn } from "@/features/auth/server-functions";
import { useAuthStore } from "@/features/auth/auth-store";
import { TextField } from "@/features/core/components/ui/text-field";
import { Checkbox } from "@/features/core/components/ui/checkbox";
import { Button } from "@/features/core/components/ui/button";
import { Icon } from "@/features/core/components/ui/icon";
import { SocialIcon } from "@/features/core/components/ui/social-icon";

export function SignUpForm() {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            terms: false as boolean,
        },
        validators: {
            onSubmit: signUpSchema,
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const user = await signUpFn({
                    data: {
                        firstName: value.firstName,
                        lastName: value.lastName,
                        email: value.email,
                        password: value.password,
                        terms: true,
                    },
                });
                setUser(user);
                toast.success(`Welcome, ${user.firstName}! Your account has been created.`);
                await router.navigate({ to: "/dashboard" });
            } catch (e) {
                setServerError(e instanceof Error ? e.message : "An error occurred.");
            }
        },
    });

    return (
        <div className="w-full max-w-104">
            <h2 className="text-cw-dark-blue-100 mb-4 text-[32px] font-bold">Create Account</h2>

            {/* Card */}
            <div className="rounded-2xl bg-[#F5F5F5] p-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        void form.handleSubmit();
                    }}
                    className="flex flex-col gap-4"
                >
                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <form.Field name="firstName">
                            {(field) => (
                                <TextField
                                    placeholder="First Name"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    error={field.state.meta.errors[0]?.message}
                                />
                            )}
                        </form.Field>

                        <form.Field name="lastName">
                            {(field) => (
                                <TextField
                                    placeholder="Last Name"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    error={field.state.meta.errors[0]?.message}
                                />
                            )}
                        </form.Field>
                    </div>

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

                    {/* Terms */}
                    <form.Field name="terms">
                        {(field) => (
                            <div className="flex flex-col gap-1">
                                <Checkbox
                                    checked={field.state.value as boolean}
                                    onChange={(e) => field.handleChange(e.target.checked)}
                                >
                                    I have read the <span className="font-bold">Terms &amp; Conditions</span> and agree
                                    to them. The <span className="font-bold">privacy policy</span> applies.
                                </Checkbox>
                                {field.state.meta.errors[0] && (
                                    <p className="text-xs text-cw-red-100">{field.state.meta.errors[0].message}</p>
                                )}
                            </div>
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
                                {isSubmitting ? "Creating account..." : "Sign Up"}
                            </Button>
                        )}
                    </form.Subscribe>

                    {/* Social */}
                    <div className="flex flex-col gap-3">
                        <p className="text-cw-dark-blue-100 text-sm font-semibold">Or create account with</p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="border-cw-grey-100 flex h-10 w-17 items-center justify-center rounded-lg border bg-white hover:bg-gray-50"
                                aria-label="Sign up with Google"
                            >
                                <SocialIcon provider="google" size={20} />
                            </button>
                            <button
                                type="button"
                                className="flex h-10 w-17 items-center justify-center rounded-lg bg-[#3875EA] hover:bg-[#2d64d3]"
                                aria-label="Sign up with Facebook"
                            >
                                <SocialIcon provider="facebook" size={20} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Below card */}
            <p className="text-cw-dark-blue-100/60 mt-4 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-cw-dark-blue-100 font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
