import {
  Controller,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthRequiredGuard } from "src/auth/guards/auth-required.guard";
import { HeartItemResponse } from "src/interaction/dtos/heartItem.dto";
import { PostCommentInteractionService } from "./postCommentInteraction.service";
import { PostViewGuard } from "src/post/guards/postView.guard";
import { ApiAccessDeniedResponse } from "src/decorators/apiAccessDeniedResponse";

@Controller("posts/:postId/comments/:commentId/interaction")
@ApiTags("Post Comments Interaction")
export class PostCommentInteractionController {
  constructor(
    private readonly interactionService: PostCommentInteractionService
  ) {}

  @Post("heart")
  @UseGuards(AuthRequiredGuard, PostViewGuard)
  @ApiOkResponse({
    description: "Comment has been successfully hearted.",
    type: HeartItemResponse,
  })
  @ApiAccessDeniedResponse()
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

  @Post("unheart")
  @UseGuards(AuthRequiredGuard, PostViewGuard)
  @ApiOkResponse({
    description: "Comment has been successfully unhearted.",
    type: HeartItemResponse,
  })
  @ApiAccessDeniedResponse()
  @HttpCode(200)
  async unheartComment(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Param("commentId") commentId: string
  ) {
    const data = await this.interactionService.unheartComment(
      postId,
      commentId,
      req.user.id
    );
    return data;
  }
}
