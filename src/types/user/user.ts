// src/types/user.ts

export type UserRole = "user" | "admin";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatarUrl?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  id: string;
  data: Partial<Omit<IUser, "id" | "role">> & {
    password?: string;
  };
}
