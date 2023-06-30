import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/pagination/pagination.module";
import { Post } from "./entities/post.entity";
import { SlugModule } from "../slug/slug.module";
import { PostService } from "./post.service";
import { UserModule } from "../users/user.module";
// import { PostMetaModule } from "./meta/post-meta.module";
// import { PostCommentModule } from "./comment/post-comment.module";
import { PostController } from "./post.controller";
import { PostComment } from "./entities/post-comment.entity";
import { PostCommentService } from "./comment/post-comment.service";
import { PostCommentController } from "./comment/post-comment.controller";
import { PostMeta } from "./entities/post-meta.entity";
import { PostMetaService } from "./meta/post-meta.service";
import { PostMetaHelperService } from "./meta/post-meta.helper.service";

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
  ],
  controllers: [PostController, PostCommentController],
  exports: [PostService],
})
export class PostModule {}
