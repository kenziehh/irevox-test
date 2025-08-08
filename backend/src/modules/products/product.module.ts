import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from 'src/commons/prisma/prisma.module';

@Module({
    imports: [PrismaModule],  
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService],
})
export class ProductModule { }
