"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Product } from "../types"
import { useGetMyProducts } from "../services/use-get-my-products"
import { useQueryClient } from "@tanstack/react-query"
import { useDeleteProduct } from "../services/use-delete-product"
import { toast } from "sonner"
import { handleApiError } from "@/lib/error"

export default function ProductListContainer() {
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const queryClient = useQueryClient()


    const { data: products, isLoading, refetch } = useGetMyProducts()


    const deleteProductMutation = useDeleteProduct({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-products"] })
            refetch()
            setDeletingId(null)
            toast.success("Produk berhasil dihapus")
        },
        onError: (error) => {
            console.error("Error deleting product:", error)
            toast.error(handleApiError(error))
            setDeletingId(null)
        },
    })

    const handleDelete = (id: string) => {
        setDeletingId(id)
        deleteProductMutation.mutate(id)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price)
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-lg">Memuat produk...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Daftar Produk</h1>
                    <p className="text-gray-600 mt-2">Kelola semua produk Anda</p>
                </div>
                <Link href="/dashboard/product/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Produk
                    </Button>
                </Link>
            </div>

            {!isLoading && (products?.length ?? 0) === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">Belum ada produk</h3>
                            <p className="text-gray-600 mb-4">Mulai dengan menambahkan produk pertama Anda</p>
                            <Link href="/dashboard/product/create">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Produk
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Produk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Produk</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead className="text-right">Harga</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!isLoading && (products ?? []).map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell className="max-w-md">
                                            <div className="truncate" title={product.description}>
                                                {product.description}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">{formatPrice(product.price)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 justify-center">
                                                <Link href={`/dashboard/product/${product.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm" disabled={deletingId === product.id}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Hapus Produk</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah Anda yakin ingin menghapus produk "{product.name}"? Tindakan ini tidak dapat
                                                                dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(product.id)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                {deletingId === product.id ? "Menghapus..." : "Hapus"}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
