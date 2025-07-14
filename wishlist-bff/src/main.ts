import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger-setup';
import { ResponseInterceptor } from './core/interceptors/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3002);
}

bootstrap();
