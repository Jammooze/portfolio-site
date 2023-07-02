import {
  Controller,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Query,
  Patch,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { Request } from "express";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { PaginationQuery } from "src/pagination/paginationQuery";
import { PostCommentService } from "./postComment.service";
import { CreatePostCommentBody } from "../dtos/comment/createPostComment.dto";
import { AuthRequiredGuard } from "../../auth/guards/auth-required.guard";
import {
  PostComment,
  GetPostCommentsResponse,
  UpdatePostCommentBody,
} from "../dtos/comment";
import { PostCommentOwnership } from "../guards/postCommentOwnership.guard";

@Controller("posts/:postId/comments")
@ApiTags("Posts Comments")
export class PostCommentController {
  constructor(private readonly commentService: PostCommentService) {}

  @Post()
  @ApiCreatedResponse({
    description: "Successfully created post comment.",
    type: PostComment,
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @UseGuards(AuthRequiredGuard)
  async createComment(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Body() createPostCommentDto: CreatePostCommentBody
  ) {
    const userId = req.user.id;

    const comment = await this.commentService.create({
      postId,
      userId,
      createCommentData: createPostCommentDto,
    });

    return comment;
  }

  @Patch(":commentId")
  @ApiOkResponse({
    description: "Successfully updated post comment.",
    type: PostComment,
  })
  @ApiNotFoundResponse({
    description: `
      1. Post cannot be found.
      2. Post comment cannot be found.
    `,
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @HttpCode(200)
  @UseGuards(AuthRequiredGuard, PostCommentOwnership)
  async updateComment(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Body() updatePostCommentDto: UpdatePostCommentBody
  ) {
    const updatedPost = await this.commentService.updateById(
      postId,
      commentId,
      updatePostCommentDto
    );

    return updatedPost;
  }

  @Delete(":commentId")
  @ApiNoContentResponse({
    description: "Succesfully deleted post comment.",
  })
  @ApiNotFoundResponse({
    description: `
      1. Post cannot be found.
      2. Post comment cannot be found.
    `,
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  async deleteComment(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string
  ) {
    await this.commentService.deleteCommentById(postId, commentId);
    return;
  }

  @Get()
  @ApiOkResponse({
    description: "Successfully fetched post comment.",
    type: GetPostCommentsResponse,
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @HttpCode(200)
  async getComments(
    @Param("postId") postId: string,
    @Query() query: PaginationQuery
  ) {
    const comments = await this.commentService.getCommentsByPostId(
      postId,
      query
    );

    return comments;
  }
}
