import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import configuration from "./config/configuration";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { IdModule } from "./id/id.module";
import { InteractionModule } from "./interaction/interaction.module";
import { AddProfileUrlToUser1688282368862 } from "./typeorm/migrations/1688282368862-AddProfileUrlToUser";

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
        migrations: [AddProfileUrlToUser1688282368862],
        migrationsRun: false,
        synchronize: configService.get("NODE_ENV") !== "production",
        // dropSchema: true,
      }),
    }),
    IdModule,
    UserModule,
    AuthModule,
    PostModule,
    InteractionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
