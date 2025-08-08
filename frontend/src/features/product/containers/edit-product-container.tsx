"use client"

import { Button } from "@/components/ui/button"
import { handleApiError } from "@/lib/error"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { ProductForm } from "../components/product-form"
import { useGetProductById } from "../services/use-get-product-by-id"
import { useUpdateProduct } from "../services/use-update-product"
import { ProductFormData } from "../types"

export default function EditProductContainer({ id }: { id: string }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const { data: product, isLoading: isProductLoading } = useGetProductById(id)
    const updateProductMutation = useUpdateProduct(id, {
        onSuccess: () => {
            toast.success("Produk berhasil diperbarui!")
            router.push("/dashboard/product")
        },
        onError: (error: unknown) => {
            console.error("Error updating product:", error)
            toast.error(handleApiError(error))
            setIsLoading(false)
        },
    })

    const handleSubmit = async (data: ProductFormData): Promise<void> => {
        setIsLoading(true)
        await new Promise<void>((resolve) => {
            updateProductMutation.mutate(data, {
                onSettled: () => {
                    setIsLoading(false)
                    resolve()
                },
            })
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/dashboard/product">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar Produk
                    </Button>
                </Link>
            </div>

            {isProductLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-lg">Memuat produk...</div>
                </div>
            ) : (
                <ProductForm
                    initialData={product}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    title="Edit Produk"
                    description="Perbarui informasi produk Anda di bawah ini"
                    submitText="Perbarui Produk"
                />
            )}
        </div>
    )
}
