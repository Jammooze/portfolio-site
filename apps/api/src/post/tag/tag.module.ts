import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostTag } from "./tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostTag])],
})
export class PostTagModule {}
