import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostTagModule } from "./post/tag/tag.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "12012003",
      // database: "voyage",
      synchronize: process.env.NODE_ENV === "development",
    }),
    PostTagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
