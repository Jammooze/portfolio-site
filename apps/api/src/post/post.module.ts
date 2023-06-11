import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { SlugModule } from "../slug/slug.module";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { UserModule } from "../users/user.module";
import { PostMetaModule } from "./meta/post-meta.module";
import { PostCommentModule } from "./comment/post-comment.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    SlugModule,
    PostMetaModule,
    PostCommentModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
