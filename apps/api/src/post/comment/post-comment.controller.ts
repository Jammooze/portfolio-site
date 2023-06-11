import { Controller, Param, Post, Body, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { PostCommentService } from "./post-comment.service";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";
import { AuthRequiredGuard } from "../../auth/guards/auth-required.guard";

@Controller("posts/:postId/comments")
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post()
  @UseGuards(AuthRequiredGuard)
  async createComment(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Body() createPostCommentDto: CreatePostCommentDto
  ) {
    const userId = req.user.id;

    const comment = await this.postCommentService.create(
      postId,
      userId,
      createPostCommentDto
    );

    return comment;
  }
}
