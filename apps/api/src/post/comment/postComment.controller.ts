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
} from "@nestjs/common";
import { Request } from "express";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { PaginationQuery } from "src/pagination/paginationQuery";
import { PostCommentService } from "./postComment.service";
import { CreatePostCommentDto } from "../dtos/comment/createPostComment.dto";
import { AuthRequiredGuard } from "../../auth/guards/auth-required.guard";
import {
  PostCommentDto,
  GetPostCommentsDto,
  UpdatePostCommentDto,
} from "../dtos/comment";
import { PostCommentOwnership } from "../guards/postCommentOwnership.guard";

@Controller("posts/:postId/comments")
@ApiTags("Posts Comments")
export class PostCommentController {
  constructor(private readonly commentService: PostCommentService) {}

  @Post()
  @ApiCreatedResponse({
    description: "Successfully created post comment.",
    type: PostCommentDto,
  })
  @ApiNotFoundResponse({
    description: `
      1. Post cannot be found.
    `,
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @UseGuards(AuthRequiredGuard)
  async createComment(
    @Req() req: Request,
    @Param("postId") postId: string,
    @Body() createPostCommentDto: CreatePostCommentDto
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
  @ApiCreatedResponse({
    description: "Successfully updated post comment.",
    type: PostCommentDto,
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
  @UseGuards(AuthRequiredGuard, PostCommentOwnership)
  async updateComment(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Body() updatePostCommentDto: UpdatePostCommentDto
  ) {
    const updatedPost = await this.commentService.updateById(
      postId,
      commentId,
      updatePostCommentDto
    );

    return updatedPost;
  }

  @Delete(":commentId")
  @ApiOkResponse({
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
    this.commentService.deleteCommentById(postId, commentId);
  }

  @Get()
  @ApiCreatedResponse({
    description: "Successfully fetched post comment.",
    type: GetPostCommentsDto,
  })
  @ApiNotFoundResponse({
    description: `
      1. Post cannot be found.
    `,
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
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
