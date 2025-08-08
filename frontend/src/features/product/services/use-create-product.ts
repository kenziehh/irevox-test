import { useMutationApi } from "@/lib/react-query"
import { Product } from "../types"
import { UseMutationOptions } from "@tanstack/react-query"

interface CreateProductPayload {
  name: string
  description: string
  price: number
}

export function useCreateProduct(
  options?: UseMutationOptions<Product, unknown, CreateProductPayload>
) {
  return useMutationApi<Product, CreateProductPayload>({
    method: "post",
    url: "/products",
    options,
  })
}
