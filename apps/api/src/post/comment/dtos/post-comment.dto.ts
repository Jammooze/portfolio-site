import { ApiProperty } from "@nestjs/swagger";
import { PostComment } from "../post-comment.entity";

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

  public static from(comment: PostComment) {
    const commentDto = new PostCommentDto();

    commentDto.id = comment.id;
    commentDto.content = comment.content;
    commentDto.createdAt = comment.createdAt;
    commentDto.updatedAt = comment.updatedAt;
    commentDto.publishedAt = comment.publishedAt;

    return commentDto;
  }
}
