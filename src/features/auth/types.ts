export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type CreateUserData = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    salt: string;
    createdAt: string;
};

export type JwtPayload = {
    sub: string;
    email: string;
    iat: number;
    exp: number;
};

export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
};
