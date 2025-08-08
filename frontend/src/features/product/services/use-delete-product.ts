import { api } from "@/lib/axios"
import { useMutationApi } from "@/lib/react-query"
import { UseMutationOptions } from "@tanstack/react-query"

export function useDeleteProduct(
    options?: UseMutationOptions<void, unknown, string>
) {
    return useMutationApi<void, string>({
        method: "delete",
        url: "", 
        options: {
            ...options,
            mutationFn: async (id: string) => {
                const res = await api.delete<void>(`/products/${id}`)
                return res.data
            },
        },
    })
}
