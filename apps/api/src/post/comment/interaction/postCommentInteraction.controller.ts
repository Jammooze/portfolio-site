import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SubmitCommentVoteDto } from "../../dtos/commentInteraction/submitCommentVote.dto";

@Controller("posts/:postId/comments/:commentId/interaction")
@ApiTags("Post Comments Interaction")
export class PostCommentInteractionController {
  @Post("vote")
  async submitVote(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Body() submitCommentVoteDto: SubmitCommentVoteDto
  ) {
    return;
  }
}
