import { Body, Controller, Param, Post, Req, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationQuery } from "src/pagination/paginationQuery";
import { Request } from "express";
import { PostCommentReplyService } from "./post-comment-reply-service.controller";
import { CreatePostCommentDto } from "../../dtos/comment";

@Controller("posts/:postId/comments/:commentId")
@ApiTags("Posts Comments Reply")
export class PostCommentReplyController {
  constructor(private readonly replyService: PostCommentReplyService) {}

  @Get("/replies")
  async getReplies(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Query() query: PaginationQuery
  ) {
    const comments = await this.replyService.getReplies(
      postId,
      commentId,
      query
    );

    return comments;
  }

  @Post("/reply")
  async createReply(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Body() createPostCommentDto: CreatePostCommentDto
  ) {
    const comment = await this.replyService.create({
      postId,
      userId: req.user.id,
      parentId: commentId,
      createCommentData: createPostCommentDto,
    });

    return comment;
  }
}
