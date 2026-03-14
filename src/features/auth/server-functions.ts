import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { env } from "cloudflare:workers";
import { hashPassword, verifyPassword, createToken } from "@/features/auth/auth";
import { findUserByEmail, createUser } from "@/features/auth/queries";
import { signUpSchema, loginSchema } from "@/features/auth/schemas";
import type { User } from "@/features/auth/types";

function getEnv() {
    const secret = process.env["JWT_SECRET"];
    if (!secret) throw new Error("JWT_SECRET is not set");
    const db = env.DB;
    return { secret, db };
}

// ---------- Sign Up ----------

export const signUpFn = createServerFn({ method: "POST" })
    .inputValidator(signUpSchema)
    .handler(async ({ data }): Promise<User> => {
        const { db, secret } = getEnv();

        const existing = await findUserByEmail(db, data.email);
        if (existing) {
            throw new Error("This email address is already registered.");
        }

        const { hash, salt } = await hashPassword(data.password);

        const user = await createUser(db, {
            id: crypto.randomUUID(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            passwordHash: hash,
            salt,
            createdAt: new Date().toISOString(),
        });

        const token = await createToken({ sub: user.id, email: user.email }, secret);
        setCookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return user;
    });

// ---------- Login ----------

export const loginFn = createServerFn({ method: "POST" })
    .inputValidator(loginSchema)
    .handler(async ({ data }): Promise<User> => {
        const { db, secret } = getEnv();

        const found = await findUserByEmail(db, data.email);
        if (!found) {
            throw new Error("Invalid email or password.");
        }

        const valid = await verifyPassword(data.password, found.passwordHash, found.salt);
        if (!valid) {
            throw new Error("Invalid email or password.");
        }

        const user: User = {
            id: found.id,
            email: found.email,
            firstName: found.firstName,
            lastName: found.lastName,
        };

        const token = await createToken({ sub: user.id, email: user.email }, secret);
        setCookie("auth_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return user;
    });
