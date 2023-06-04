import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      // Will strip validated object of any properties that do not have any decorators.
      whitelist: true,
      // Transform payloads to object typed according to their DTO classes.
      transform: true,
      stopAtFirstError: true,
    })
  );

  app.enableCors({
    origin: [configService.getOrThrow<string>("baseUrl")],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(
    session({
      secret: "ewqwqewqqweqweqwe",
      resave: false,
      saveUninitialized: true,
      // jamesfallen :]
      name: "voyage-session-cookie",
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(configService.getOrThrow<string>("apiPort"));
}
bootstrap();
