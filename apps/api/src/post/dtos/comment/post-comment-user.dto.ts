import { ApiProperty } from "@nestjs/swagger";
import { PostComment } from "../../entities/post-comment.entity";
import { UserDto } from "../../../users/dtos/user.dto";
import { PostCommentDto } from "./post-comment.dto";

export class PostCommentUserDto extends PostCommentDto {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;

  static from(record: PostComment): PostCommentUserDto {
    const postCommentDto = super.from(record) as PostCommentUserDto;
    postCommentDto.user = UserDto.from(record.user);

    return postCommentDto;
  }

  static fromArray(records: PostComment[]): PostCommentUserDto[] {
    return records.map((record) => PostCommentUserDto.from(record), this);
  }
}
