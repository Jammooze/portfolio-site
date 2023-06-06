import { Module } from "@nestjs/common";
import { PostMetaService } from "./post-meta.service";

@Module({
  providers: [PostMetaService],
  exports: [PostMetaService],
})
export class PostMetaModule {}
