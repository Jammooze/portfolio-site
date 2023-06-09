import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { PostMeta } from "./post-meta.entity";
import { PostMetaService } from "./post-meta.service";
import { PostMetaHelperService } from "./post-meta.helper.service";

@Module({
  imports: [TypeOrmModule.forFeature([PostMeta])],
  providers: [PostMetaHelperService, PostMetaService],
  // providers: [PostMetaHelperService],
  exports: [PostMetaService, PostMetaHelperService],
})
export class PostMetaModule {}
