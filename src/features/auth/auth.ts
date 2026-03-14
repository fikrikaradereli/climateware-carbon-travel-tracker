// Cloudflare Workers native Web Crypto API — PBKDF2 + HMAC-SHA256 JWT

import type { JwtPayload } from "@/features/auth/types";

// ---------- Password Hashing ----------

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const saltHex = bufToHex(salt);

    const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
        "deriveBits",
    ]);

    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
        keyMaterial,
        256
    );

    return { hash: bufToHex(new Uint8Array(bits)), salt: saltHex };
}

export async function verifyPassword(password: string, hash: string, saltHex: string): Promise<boolean> {
    const salt = hexToBuf(saltHex);

    const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
        "deriveBits",
    ]);

    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
        keyMaterial,
        256
    );

    return bufToHex(new Uint8Array(bits)) === hash;
}

// ---------- JWT (HMAC-SHA256) ----------

export async function createToken(payload: Omit<JwtPayload, "iat" | "exp">, secret: string): Promise<string> {
    const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const now = Math.floor(Date.now() / 1000);
    const claims = b64url(
        JSON.stringify({
            ...payload,
            iat: now,
            exp: now + 60 * 60 * 24 * 7, // 7 days
        })
    );

    const data = `${header}.${claims}`;
    const key = await importHmacKey(secret);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));

    return `${data}.${bufToB64url(new Uint8Array(sig))}`;
}

// ---------- Helpers ----------

function bufToHex(buf: Uint8Array): string {
    return Array.from(buf)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

function hexToBuf(hex: string): Uint8Array<ArrayBuffer> {
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        arr[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return arr;
}

function b64url(str: string): string {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bufToB64url(buf: Uint8Array): string {
    return btoa(String.fromCharCode(...buf))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
        "sign",
    ]);
}
