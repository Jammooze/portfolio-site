import {
  Controller,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Query,
} from "@nestjs/common";
import { Request } from "express";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { PaginationQuery } from "src/pagination/paginationQuery";
import { PostCommentService } from "./post-comment.service";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";
import { AuthRequiredGuard } from "../../auth/guards/auth-required.guard";
import { PostCommentDto } from "./dtos/post-comment.dto";
import { GetPostCommentsDto } from "./dtos/get-post.comments.dto";

@Controller("posts/:postId/comments")
@ApiTags("Posts Comments")
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post()
  @ApiCreatedResponse({
    type: PostCommentDto,
  })
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

  @Get()
  @ApiCreatedResponse({
    type: GetPostCommentsDto,
  })
  async getComments(
    @Param("postId") postId: string,
    @Query() query: PaginationQuery
  ) {
    const comments = await this.postCommentService.getCommentsByPostId(
      postId,
      query
    );

    return comments;
  }
}
