import { Controller, Param, Post, Body } from "@nestjs/common";
import { PostCommentService } from "./post-comment.service";
import { CreatePostCommentDto } from "./dtos/create-post-comment.dto";

@Controller("posts/:postId/comments")
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  @Post()
  async createComment(
    @Param("postId") postId: string,
    @Body() createPostCommentDto: CreatePostCommentDto
  ) {
    return;
  }
}
