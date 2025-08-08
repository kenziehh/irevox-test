import { useQueryApi } from "@/lib/react-query"
import { Product } from "../types"

export function useGetProductById(id: string) {
  return useQueryApi<Product>(
    ["product", id],   
    `/products/${id}`
  )
}
