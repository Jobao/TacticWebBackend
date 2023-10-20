import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalGuards(new AuthGuardGateway(new JwtService(), app.get(Reflector)));
  const config = new DocumentBuilder()
    .setTitle('Tactic Game')
    .setDescription('Juego estilo FFT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
