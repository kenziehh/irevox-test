"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { ProductFormData } from "../types"
import { useCreateProduct } from "../services/use-create-product"
import { ProductForm } from "../components/product-form"
import { toast } from "sonner"
import { handleApiError } from "@/lib/error"

export default function CreateProductContainer() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const createProductMutation = useCreateProduct({
        onSuccess: () => {
            toast.success("Produk berhasil dibuat!")
            router.push("/dashboard/product")
        },
        onError: (error: unknown) => {
            console.error("Error creating product:", error)
            toast.error(handleApiError(error))
            setIsLoading(false)
        },
    })

    const handleSubmit = async (data: ProductFormData): Promise<void> => {
        setIsLoading(true)
        await new Promise<void>((resolve) => {
            createProductMutation.mutate(data, {
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

            <ProductForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                title="Tambah Produk Baru"
                description="Isi form di bawah untuk menambahkan produk baru"
                submitText="Buat Produk"
            />
        </div>
    )
}
