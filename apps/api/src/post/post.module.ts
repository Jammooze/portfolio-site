import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { SlugModule } from "../slug/slug.module";
import { PostService } from "./post.service";
import { UserModule } from "../users/user.module";
import { PostMetaModule } from "./meta/post-meta.module";
import { PostCommentModule } from "./comment/post-comment.module";
import { PostController } from "./post.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    SlugModule,
    PostMetaModule,
    forwardRef(() => PostCommentModule),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
