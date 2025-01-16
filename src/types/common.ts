import { ROLE } from './enums';

export type BaseEntity = {
    id: string;
    createdAt: string;
    updatedAt: string;
};

export type User = BaseEntity & {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    isOnline: boolean;
    isActive: boolean;
    lastSeen: string;
    isEmailVerified: boolean;
    role: ROLE;
    emailVerificationCode?: string | null;
    passwordResetCode?: string | null;
};

export type Client = BaseEntity & {
    name: string;
    email: string;
    phoneNumber: string;
    type: string;
    address: string;
    isActive: boolean;
};

export type Document = {
    name: string;
    role: 'Input' | 'Output' | 'Reference';
    purpose: string;
};

export type AuthResponse = {
    message: string;
    statusCode: number;
    data: {
        accessToken: string;
        user: User;
    };
};

export type SignUpData = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
};

export type LoginData = {
    email: string;
    password: string;
};
