import type { User, CreateUserData } from "@/features/auth/types";

interface UserRow {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    password_hash: string;
    salt: string;
    created_at: string;
}

function rowToUser(row: UserRow): User {
    return {
        id: row.id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
    };
}

export async function findUserByEmail(
    db: D1Database,
    email: string
): Promise<(User & { passwordHash: string; salt: string }) | null> {
    const row = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<UserRow>();
    if (!row) return null;
    return { ...rowToUser(row), passwordHash: row.password_hash, salt: row.salt };
}

export async function createUser(db: D1Database, data: CreateUserData): Promise<User> {
    await db
        .prepare(
            "INSERT INTO users (id, email, first_name, last_name, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(data.id, data.email, data.firstName, data.lastName, data.passwordHash, data.salt, data.createdAt)
        .run();

    return {
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
    };
}
