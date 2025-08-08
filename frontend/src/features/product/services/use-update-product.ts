import { UseMutationOptions } from "@tanstack/react-query"
import { Product } from "../types"
import { useMutationApi } from "@/lib/react-query"

interface UpdateProductData {
  name: string
  description: string
  price: number
}

export function useUpdateProduct(
  id: string,
  options?: UseMutationOptions<Product, unknown, UpdateProductData>
) {
  return useMutationApi<Product, UpdateProductData>({
    method: "put",
    url: `/products/${id}`,
    options,
  })
}
