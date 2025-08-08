import EditProductContainer from '@/features/product/containers/edit-product-container'
import React from 'react'

export default function EditProductPage({ params }: { params: { id: string } }) {
    return (
        <EditProductContainer id={params.id} />
    )
}
