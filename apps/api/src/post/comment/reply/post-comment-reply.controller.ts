import { Controller, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { PostCommentReplyService } from "./post-comment-reply-service.controller";

@Controller("posts/:postId/comments/:commentId/replies")
@ApiTags("Posts Comments Replies")
export class PostCommentReplyController {
  constructor(private readonly replyService: PostCommentReplyService) {}

  @Post()
  async createReply(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Param("commentId") commentId: string
  ) {
    // const userId = req.user.id;
  }
}
