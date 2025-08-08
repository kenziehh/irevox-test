import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],

  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      console.log('OPTIONS preflight request received:', req.headers);
    }
    next();
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
