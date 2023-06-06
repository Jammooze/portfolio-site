import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { SlugModule } from "../slug/slug.module";
import { IdModule } from "../id/id.module";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SlugModule, IdModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
