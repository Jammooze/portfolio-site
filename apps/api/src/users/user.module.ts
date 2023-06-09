import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { HashModule } from "../hash/hash.module";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
