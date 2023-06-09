import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";
import { AppModule } from "./app.module";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";

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

  const userConfig = new DocumentBuilder()
    .setTitle("User API")
    .setDescription("API for managing the users.")
    .setVersion("1.0")
    .build();

  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [UserModule],
  });
  SwaggerModule.setup("docs/users", app, userDocument);

  const authConfig = new DocumentBuilder()
    .setTitle("Auth API")
    .setDescription("API for managing the authentication.")
    .setVersion("1.0")
    .build();

  const authDocument = SwaggerModule.createDocument(app, authConfig, {
    include: [AuthModule],
  });
  SwaggerModule.setup("docs/auth", app, authDocument);

  const postConfig = new DocumentBuilder()
    .setTitle("Posts API")
    .setDescription("API for managing the posts.")
    .setVersion("1.0")
    .build();

  const postDocument = SwaggerModule.createDocument(app, postConfig, {
    include: [PostModule],
  });
  SwaggerModule.setup("docs/posts", app, postDocument);

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
