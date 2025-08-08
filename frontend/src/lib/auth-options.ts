import { BASE_URL, NEXTAUTH_SECRET } from "@/lib/env";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decodeJwt } from "./decode";
import { login } from "@/features/auth/services/login-service";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "orpheon@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                return await login(credentials);
            },
        }), 
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 6, // 6 hour
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                access_token: token.access_token as string,
                ...session.user,
            };
            return session;
        },
    },
    secret: NEXTAUTH_SECRET,
};