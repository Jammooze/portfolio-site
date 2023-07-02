import { Module, forwardRef } from "@nestjs/common";
import { InteractionService } from "./interaction.service";
import { UserModule } from "src/users/user.module";
import { PostModule } from "src/post/post.module";

@Module({
  imports: [UserModule, forwardRef(() => PostModule)],
  providers: [InteractionService],
  exports: [InteractionService],
})
export class InteractionModule {}
