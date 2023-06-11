import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostComment } from "./post-comment.entity";
import { PostCommentController } from "./post-comment.controller";
import { PostCommentService } from "./post-comment.service";
import { PostCommentInteractionController } from "./post-comment-interaction.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PostComment])],
  controllers: [PostCommentController, PostCommentInteractionController],
  providers: [PostCommentService],
  exports: [],
})
export class PostCommentModule {}
