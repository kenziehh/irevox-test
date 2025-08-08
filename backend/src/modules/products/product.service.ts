import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(private productRepo: ProductRepository) { }

    async getProductsByUser(userId: string): Promise<Product[]> {
        return this.productRepo.findByUserId(userId);
    }

    async createProduct(userId: string, dto: CreateProductDto): Promise<Product> {
        return this.productRepo.create(userId, dto);
    }

    async updateProduct(id: string, userId: string, dto: UpdateProductDto): Promise<Product> {
        return this.productRepo.update(id, userId, dto);
    }

    async deleteProduct(id: string, userId: string): Promise<void> {
        return this.productRepo.delete(id, userId);
    }
}
