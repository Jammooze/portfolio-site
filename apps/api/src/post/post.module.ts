import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/pagination/pagination.module";
import { Post } from "./entities/post.entity";
import { SlugModule } from "../slug/slug.module";
import { PostService } from "./post.service";
import { UserModule } from "../users/user.module";
import { PostController } from "./post.controller";
import { PostComment } from "./entities/post-comment.entity";
import { PostCommentService } from "./comment/post-comment.service";
import { PostCommentController } from "./comment/post-comment.controller";
import { PostMeta } from "./entities/post-meta.entity";
import { PostMetaService } from "./meta/post-meta.service";
import { PostMetaHelperService } from "./meta/post-meta.helper.service";
import { PostCommentReplyController } from "./comment/reply/post-comment-reply.controller";
import { PostCommentReplyService } from "./comment/reply/post-comment-reply-service.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostComment, PostMeta]),
    UserModule,
    SlugModule,
    PaginationModule,
    // PostMetaModule,
  ],
  providers: [
    PostService,
    PostCommentService,
    PostMetaService,
    PostMetaHelperService,
    PostCommentReplyService,
  ],
  controllers: [
    PostController,
    PostCommentController,
    PostCommentReplyController,
  ],
  exports: [PostService],
})
export class PostModule {}
