import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { PostTagModule } from "./post/tag/tag.module";
import configuration from "./config/configuration";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
// import { PostMetaModule } from "./post/meta/post-meta.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        username: configService.getOrThrow("database.username"),
        password: configService.getOrThrow("database.password"),
        autoLoadEntities: true,
        // database: "voyage"
        synchronize: true,
        // dropSchema: false,
      }),
    }),
    // PostTagModule,
    UserModule,
    AuthModule,
    PostModule,
    // PostMetaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
