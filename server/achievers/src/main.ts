import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Serve static files from /uploads at http://localhost:5000/uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // ✅ Enable CORS - Allow specific origins and all origins
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      /^https?:\/\/localhost:\d+$/, // Allow any localhost port
      /^https?:\/\/127\.0\.0\.1:\d+$/, // Allow any 127.0.0.1 port
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
    credentials: true,
  });

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('achieverslms API')
    .setDescription('API documentation for My App')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Start server
  await app.listen(5000);
}
bootstrap();