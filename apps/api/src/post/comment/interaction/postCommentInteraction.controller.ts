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
import { HeartItemResponse } from "src/interaction/heartItem.dto";
import { PostCommentInteractionService } from "./postCommentInteraction.service";

@Controller("posts/:postId/comments/:commentId/interaction")
@ApiTags("Post Comments Interaction")
export class PostCommentInteractionController {
  constructor(
    private readonly interactionService: PostCommentInteractionService
  ) {}

  @Post("heart")
  @UseGuards(AuthRequiredGuard)
  @ApiOkResponse({
    description: "Comment has been successfully hearted.",
    type: HeartItemResponse,
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @HttpCode(200)
  async heartComment(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Param("commentId") commentId: string
  ) {
    const data = await this.interactionService.heartComment(
      postId,
      commentId,
      req.user.id
    );
    return data;
  }
}
