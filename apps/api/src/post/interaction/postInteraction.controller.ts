import {
  Controller,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthRequiredGuard } from "src/auth/guards/auth-required.guard";
import { HeartItemResponse } from "src/interaction/heartItem.dto";
import { PostInteractionService } from "./postInteraction.service";
import { PostViewGuard } from "../guards/postView.guard";
import { ApiAccessDeniedResponse } from "src/decorators/apiAccessDeniedResponse";

@Controller("posts/:postId/interaction")
@ApiTags("Post Interaction")
export class PostInteractionController {
  constructor(private readonly interactionService: PostInteractionService) {}
  @Post("heart")
  @UseGuards(AuthRequiredGuard, PostViewGuard)
  @ApiOkResponse({
    description: "Post has been successfully hearted.",
    type: HeartItemResponse,
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found",
  })
  @ApiAccessDeniedResponse()
  @HttpCode(200)
  async heartComment(@Req() req: Request, @Param("postId") postId: string) {
    const data = await this.interactionService.heartPost(postId, req.user.id);
    return data;
  }
}
