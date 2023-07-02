import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Delete,
  HttpCode,
  Param,
  Get,
  Patch,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Post as PostDto } from "./dtos/post/";
import { PostService } from "./post.service";
import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";
import { UpdatePostBody, CreatePostBody } from "./dtos/post";
import { PostOwnershipGuard } from "./guards/postOwnership.guard";
import { PostViewGuard } from "./guards/postView.guard";

@Controller("posts")
@ApiTags("Posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: "Create a new post" })
  @ApiCreatedResponse({
    description: "Successfully created post.",
    type: PostDto,
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @UseGuards(AuthRequiredGuard)
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostBody) {
    const post = await this.postService.create(req.user.id, createPostDto);
    return post;
  }

  @Patch(":postId")
  @ApiOperation({ summary: "Partially update a post" })
  @ApiOkResponse({
    description: "Successfully updated post.",
    type: PostDto,
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found.",
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @UseGuards(AuthRequiredGuard, PostOwnershipGuard)
  async updatePost(
    @Param("postId") postId: string,
    @Body() updatePostDto: UpdatePostBody
  ) {
    const updatedPost = await this.postService.updateById(
      postId,
      updatePostDto
    );
    return updatedPost;
  }

  @Get(":postId")
  @UseGuards(PostViewGuard)
  @ApiOperation({ summary: "Get a post" })
  @ApiOkResponse({
    description: "Successfully fetched post.",
    type: PostDto,
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found.",
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  async getPostById(@Req() req: Request) {
    const post = PostDto.from(req["post"]);
    return post;
  }

  @Delete(":postId")
  @ApiOperation({ summary: "Delete a post" })
  @ApiNoContentResponse({
    description: "Successfully deleted post.",
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found.",
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @HttpCode(204)
  @UseGuards(AuthRequiredGuard, PostOwnershipGuard)
  async deletePost(@Param("postId") postId: string) {
    await this.postService.deleteById(postId);
    return;
  }
}
