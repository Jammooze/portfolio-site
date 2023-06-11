import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModule } from "../post.module";
import { UserModule } from "../../users/user.module";
import { PostComment } from "./post-comment.entity";
import { PostCommentController } from "./post-comment.controller";
import { PostCommentService } from "./post-comment.service";
import { PostCommentInteractionController } from "./post-comment-interaction.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostComment]),
    UserModule,
    forwardRef(() => PostModule),
  ],
  controllers: [PostCommentController, PostCommentInteractionController],
  providers: [PostCommentService],
  exports: [],
})
export class PostCommentModule {}
