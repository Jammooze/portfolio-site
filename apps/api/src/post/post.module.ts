import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { SlugModule } from "../slug/slug.module";
import { IdModule } from "../id/id.module";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { UserModule } from "../users/user.module";
// import { PostMeta } from "./entities/meta.entity";
import { PostMetaModule } from "./meta/post-meta.module";
// import { PostMeta } from "./entities/post-meta.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    SlugModule,
    IdModule,
    UserModule,
    PostMetaModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
