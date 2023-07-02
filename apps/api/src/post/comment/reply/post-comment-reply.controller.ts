import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { PaginationQuery } from "src/pagination/paginationQuery";
import { AuthRequiredGuard } from "src/auth/guards/auth-required.guard";
import { PostCommentReplyService } from "./post-comment-reply-service.controller";
import {
  CreatePostCommentBody,
  GetPostCommentsResponse,
  PostComment,
} from "../../dtos/comment";
import { PostViewGuard } from "src/post/guards/postView.guard";
import { ApiAccessDeniedResponse } from "src/decorators/apiAccessDeniedResponse";

@Controller("posts/:postId/comments/:commentId")
@ApiTags("Posts Comments Reply")
export class PostCommentReplyController {
  constructor(private readonly replyService: PostCommentReplyService) {}

  @Get("/replies")
  @UseGuards(PostViewGuard)
  @ApiOkResponse({
    description: "Successfully fetched post comment replies.",
    type: GetPostCommentsResponse,
  })
  @ApiNotFoundResponse({
    description: `
      1. Post cannot be found.
      2. Post comment cannot be found.
    `,
  })
  @ApiAccessDeniedResponse()
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
  @UseGuards(AuthRequiredGuard, PostViewGuard)
  @ApiOkResponse({
    type: PostComment,
    description: "Successfully replied to post comment.",
  })
  @ApiNotFoundResponse({
    description: `
      1. Post cannot be found.
      2. Post comment cannot be found.
    `,
  })
  @ApiAccessDeniedResponse()
  async createReply(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Body() createPostCommentDto: CreatePostCommentBody
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
