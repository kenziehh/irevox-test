import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private productRepo: ProductRepository) { }

    async getProductsByUser(userId: string): Promise<Product[]> {
        try {
            return await this.productRepo.findByUserId(userId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to get products');
        }
    }

    async getProductById(id: string, userId: string): Promise<Product> {
        try {
            const product = await this.productRepo.findById(id);
            if (!product) throw new NotFoundException('Product not found');
            if (product.userId !== userId) throw new ForbiddenException('Not authorized to access this product');
            return product;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
            throw new InternalServerErrorException('Failed to get product');
        }
    }


    async createProduct(userId: string, dto: CreateProductDto): Promise<Product> {
        try {
            return await this.productRepo.create(userId, dto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create product');
        }
    }

    async updateProduct(id: string, userId: string, dto: UpdateProductDto): Promise<Product> {
        try {
            return await this.productRepo.update(id, userId, dto);
        } catch (error) {
            throw new InternalServerErrorException('Failed to update product');
        }
    }

    async deleteProduct(id: string, userId: string): Promise<void> {
        try {
            return await this.productRepo.delete(id, userId);
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete product');
        }
    }
}
