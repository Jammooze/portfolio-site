import {
  Controller,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request } from "express";
import { AuthRequiredGuard } from "src/auth/guards/auth-required.guard";
import { HeartCommentResponse } from "src/post/dtos/comment";
import { PostCommentInteractionService } from "./postCommentInteraction.service";

@Controller("posts/:postId/comments/:commentId/interaction")
@ApiTags("Post Comments Interaction")
export class PostCommentInteractionController {
  constructor(
    private readonly interactionService: PostCommentInteractionService
  ) {}

  @Post("heart")
  // @UseGuards(AuthRequiredGuard)
  @ApiOkResponse({
    description: "Comment has been successfully hearted.",
    type: HeartCommentResponse,
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @HttpCode(200)
  async heartComment(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Param("commentId") commentId: string
  ): Promise<HeartCommentResponse> {
    const response = this.interactionService.heartComment(
      postId,
      commentId,
      "1"
    );
    return response;
  }
}
