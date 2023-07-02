import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { InteractionModule } from "src/interaction/interaction.module";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { HashModule } from "../hash/hash.module";
import { UserController } from "./user.controller";
// import { UserInteractionController } from "./interaction/userInteraction.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HashModule,
    // forwardRef(() => InteractionModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
