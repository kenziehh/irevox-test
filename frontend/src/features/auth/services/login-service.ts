import { decodeJwt } from "@/lib/decode";
import { BASE_URL } from "@/lib/env";
import axios from "axios";

export async function login(credentials: Record<"email" | "password", string> | undefined) {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        const token = response.data?.access_token;
        const decoded = decodeJwt(token);
        if (token) {
            return {
                email: credentials?.email,
                id: decoded.user_id,
                access_token: token,
            };
        }

        return null;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data.message || "Gagal masuk!");
        } else {
            throw new Error("Terjadi kesalahan saat masuk");
        }
    }
}