import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostTagModule } from "./post/tag/tag.module";
import configuration from "./config/configuration";
import { UserModule } from "./users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      // we are already using dotenv from turbo to load the env file.
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow("DATABASE_HOST"),
        port: configService.get("DATABASE_PORT"),
        username: configService.getOrThrow("DATABASE_USERNAME"),
        password: configService.getOrThrow("DATABASE_PASSWORD"),
        // database: "voyage",
        synchronize: configService.get("NODE_ENV") === "development",
      }),
    }),
    PostTagModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
