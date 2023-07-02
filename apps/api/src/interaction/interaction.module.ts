import { Module, forwardRef } from "@nestjs/common";
import { HeartInteractionService } from "./heartInteraction.service";
import { UserModule } from "src/users/user.module";
import { PostModule } from "src/post/post.module";

@Module({
  imports: [UserModule, forwardRef(() => PostModule)],
  providers: [HeartInteractionService],
  exports: [HeartInteractionService],
})
export class InteractionModule {}
