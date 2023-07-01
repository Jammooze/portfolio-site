import { PaginationResult } from "src/pagination/paginationResult.interface";
import { PostComment } from "./postComment.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetPostCommentsResponse extends PaginationResult<PostComment> {
  @ApiProperty({ type: [PostComment] })
  results: PostComment[];
}
