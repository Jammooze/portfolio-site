import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/pagination/pagination.module";
import { Post, PostComment, PostMeta } from "./entities";
import { SlugModule } from "../slug/slug.module";
import { PostService } from "./post.service";
import { UserModule } from "../users/user.module";
import { PostController } from "./post.controller";
import { PostMetaService } from "./meta/post-meta.service";
import { PostCommentService } from "./comment/postComment.service";
import { PostCommentController } from "./comment/postComment.controller";
import { PostMetaHelperService } from "./meta/post-meta.helper.service";
import { PostCommentReplyController } from "./comment/reply/post-comment-reply.controller";
import { PostCommentReplyService } from "./comment/reply/post-comment-reply-service.controller";
import { PostCommentInteractionController } from "./comment/interaction/postCommentInteraction.controller";

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
    PostCommentInteractionController,
  ],
  exports: [PostService],
})
export class PostModule {}
