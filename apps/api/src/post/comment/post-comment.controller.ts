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
import { PostCommentService } from "./post-comment.service";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";
import { AuthRequiredGuard } from "../../auth/guards/auth-required.guard";
import { ApiTags } from "@nestjs/swagger";
import { GetCommentsQueryDto } from "./dtos/get-comments-query.dto";

@Controller("posts/:postId/comments")
@ApiTags("Posts Comments")
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

  @Get()
  async getComments(
    @Param("postId") postId: string,
    @Query() query: GetCommentsQueryDto
  ) {
    console.log(query);

    return {
      previousPageCursor: "",
      nextPageCursor: "",
      comments: [],
    };
  }
}
