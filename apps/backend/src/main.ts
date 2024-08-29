import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/modules/app.module";
import * as utils from "@core/utils";

async function bootstrap() {
  console.log(
    `Testing usage of function from @core/utils in this app: ${utils.arrayIsEmpty.name}([1]) -> ${utils.arrayIsEmpty([1])}`
  );
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
