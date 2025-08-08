import { ulid } from 'ulid';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'user@example.com',
            password: passwordHash,
        },
    });

    console.log('User created:', user);

    const products = [
        {
            id: ulid(),
            name: 'Produk A',
            description: 'Deskripsi Produk A',
            price: 100000,
            userId: user.id,
        },
        {
            id: ulid(),
            name: 'Produk B',
            description: 'Deskripsi Produk B',
            price: 200000,
            userId: user.id,
        },
    ];

    for (const product of products) {
        const createdProduct = await prisma.product.create({
            data: product,
        });
        console.log('Product created:', createdProduct);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
