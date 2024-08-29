import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app.module";
import { Prisma } from "@core/db";

async function bootstrap() {
  const prisma = Prisma
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
