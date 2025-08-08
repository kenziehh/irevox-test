"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LogOutPage() {
    useEffect(() => {
        const clearAuthCache = async () => {
            try {
                // Hapus session dari localStorage & sessionStorage
                localStorage.removeItem("next-auth.session-token");
                sessionStorage.removeItem("next-auth.session-token");

                toast.success("Logged out");

                await signOut({ redirect: true, callbackUrl: "/" });
            } catch (error) {
                console.error("Error clearing auth cache:", error);
            }
        };

        clearAuthCache();
    }, []);

    return <></>;
}