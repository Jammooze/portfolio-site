import { ApiProperty } from "@nestjs/swagger";
import { PostComment } from "../post-comment.entity";
import { UserDto } from "../../../users/dtos/user.dto";
import { PostCommentDto } from "./post-comment.dto";

export class PostCommentUserDto extends PostCommentDto {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;

  static from(comment: PostComment): PostCommentUserDto {
    const postCommentDto = super.from(comment) as PostCommentUserDto;
    postCommentDto.user = UserDto.from(comment.user);

    return postCommentDto;
  }
}
