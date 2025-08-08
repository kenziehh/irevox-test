import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/commons/prisma/prisma.service';

@Injectable()
export class ProductRepository {
    constructor(private prisma: PrismaService) { }

    async findByUserId(userId: string): Promise<Product[]> {
        try {
            return await this.prisma.product.findMany({ where: { userId } });
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async findById(id: string): Promise<Product | null> {
        try {
            return await this.prisma.product.findUnique({ where: { id } });
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch product');
        }
    }

    async create(userId: string, dto: CreateProductDto): Promise<Product> {
        try {
            return await this.prisma.product.create({
                data: {
                    ...dto,
                    userId,
                },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to create product');
        }
    }

    async update(id: string, userId: string, dto: UpdateProductDto): Promise<Product> {
        try {
            const product = await this.findById(id);
            if (!product) throw new NotFoundException('Product not found');
            if (product.userId !== userId) throw new ForbiddenException('Not authorized to update this product');

            return await this.prisma.product.update({
                where: { id },
                data: dto,
            });
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
            throw new InternalServerErrorException('Failed to update product');
        }
    }

    async delete(id: string, userId: string): Promise<void> {
        try {
            const product = await this.findById(id);
            if (!product) throw new NotFoundException('Product not found');
            if (product.userId !== userId) throw new ForbiddenException('Not authorized to delete this product');

            await this.prisma.product.delete({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof ForbiddenException) throw error;
            throw new InternalServerErrorException('Failed to delete product');
        }
    }
}
