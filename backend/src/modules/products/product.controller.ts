import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async getUserProducts(@Request() req) {
        return this.productService.getProductsByUser(req.user.userId);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string, @Request() req) {
        return this.productService.getProductById(id, req.user.userId);
    }


    @Post()
    async createProduct(@Request() req, @Body() dto: CreateProductDto) {
        return this.productService.createProduct(req.user.userId, dto);
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Request() req, @Body() dto: UpdateProductDto) {
        return this.productService.updateProduct(id, req.user.userId, dto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string, @Request() req) {
        return this.productService.deleteProduct(id, req.user.userId);
    }
}
