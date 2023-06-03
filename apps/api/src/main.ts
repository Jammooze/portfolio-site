import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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
      cookie: {
        maxAge: 60000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(configService.getOrThrow<string>("apiPort"));
}
bootstrap();
