import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "12012003",
      // database: "voyage",
      entities: [],
      synchronize: process.env.NODE_ENV === "development",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
