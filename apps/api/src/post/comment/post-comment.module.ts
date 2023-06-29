import { Module, forwardRef } from "@nestjs/common";
import { PaginationModule } from "src/pagination/pagination.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModule } from "../post.module";
import { UserModule } from "../../users/user.module";
import { PostComment } from "./post-comment.entity";
import { PostCommentController } from "./post-comment.controller";
import { PostCommentService } from "./post-comment.service";
// import { PostCommentInteractionController } from "./post-comment-interaction.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([PostComment]),
    UserModule,
    PaginationModule,
    forwardRef(() => PostModule),
  ],
  controllers: [PostCommentController],
  providers: [PostCommentService],
  exports: [],
})
export class PostCommentModule {}
