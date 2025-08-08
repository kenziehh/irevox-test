import { useQueryApi } from "@/lib/react-query";
import { Product } from "../types";

export function useGetMyProducts() {
  return useQueryApi<Product[]>(
    ["my-products"],
    `/products`
  )
}