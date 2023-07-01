import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PostComment as PostCommentEntity } from "../../entities/postComment.entity";
import { User } from "src/users/dtos/user.dto";

export class PostComment {
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

  @ApiProperty()
  edited: boolean;

  @ApiPropertyOptional()
  user: User;

  static from(record: PostCommentEntity) {
    const commentDto = new PostComment();

    commentDto.id = record.id;
    commentDto.content = record.content;
    commentDto.createdAt = record.createdAt;
    commentDto.updatedAt = record.updatedAt;
    commentDto.publishedAt = record.publishedAt;

    if (record.user) {
      commentDto.user = User.from(record.user);
    }

    return commentDto;
  }

  static fromArray(records: PostCommentEntity[]) {
    return records.map((record) => PostComment.from(record));
  }
}
