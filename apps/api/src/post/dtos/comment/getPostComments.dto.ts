import { PaginationResult } from "src/pagination/paginationResult.interface";
import { PostCommentDto } from "./postComment.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetPostCommentsDto extends PaginationResult<PostCommentDto> {
  @ApiProperty({ type: [PostCommentDto] })
  results: PostCommentDto[];
}
