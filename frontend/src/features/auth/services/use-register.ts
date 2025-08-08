"use client"

import { handleApiError } from "@/lib/error"
import { useMutationApi } from "@/lib/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface RegisterPayload {
    email: string
    password: string
    name: string
}

interface UseRegisterProps {
    onSuccess?: () => void
    onError?: (message: string) => void
}

export function useRegister({ onSuccess, onError }: UseRegisterProps = {}) {
    const router = useRouter()

    const { mutate, isPending } = useMutationApi<null, RegisterPayload>({
        method: "post",
        url: "/auth/register",
        options: {
            onSuccess: () => {
                toast.success("Registration successful!")
                onSuccess?.()
                router.push("/auth/login")
            },
            onError: (error) => {
                const message = handleApiError(error)
                toast.error(message)
                onError?.(message)
            },
        },
    })

    return {
        register: mutate,
        isLoading: isPending,
    }
}