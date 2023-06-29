import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PostComment } from "../post-comment.entity";
import { UserDto } from "src/users/dtos/user.dto";

export class PostCommentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ nullable: true })
  publishedAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  user: UserDto;

  static from(record: PostComment) {
    const commentDto = new PostCommentDto();

    commentDto.id = record.id;
    commentDto.content = record.content;
    commentDto.createdAt = record.createdAt;
    commentDto.updatedAt = record.updatedAt;
    commentDto.publishedAt = record.publishedAt;

    if (record.user) {
      commentDto.user = UserDto.from(record.user);
    }

    return commentDto;
  }

  static fromArray(records: PostComment[]) {
    return records.map((record) => PostCommentDto.from(record));
  }
}
