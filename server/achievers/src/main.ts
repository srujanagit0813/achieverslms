import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


           app.enableCors({
    origin: 'http://localhost:3000', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you're sending cookies or auth headers
  });

  
  const config = new DocumentBuilder()
    .setTitle('achieverslms API')
    .setDescription('API documentation for My App')
    .setVersion('1.0')
    
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(5000);
}
bootstrap();
