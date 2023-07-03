import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InteractionModule } from "src/interaction/interaction.module";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { HashModule } from "../hash/hash.module";
import { UserController } from "./user.controller";
import { UserInteractionController } from "./interaction/userInteraction.controller";
import { UserInteractionService } from "./interaction/userInteraction.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), InteractionModule, HashModule],
  providers: [UserService, UserInteractionService],
  controllers: [UserController, UserInteractionController],
  exports: [UserService],
})
export class UserModule {}
