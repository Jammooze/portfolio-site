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
} from "@nestjs/swagger";
import { Request } from "express";
import { Post as PostEntity } from "./entities/post.entity";
import { PostService } from "./post.service";
import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";
import { UpdatePostDto, CreatePostDto } from "./dtos/post";
import { PostOwnershipGuard } from "./guards/post-ownership.guard";
import { ApiTags } from "@nestjs/swagger";

@Controller("posts")
@ApiTags("Posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: "Create a new post" })
  @ApiCreatedResponse({
    description: "OK.",
    type: PostEntity,
  })
  @ApiForbiddenResponse({
    description: "You do not have permission to access this resource.",
  })
  @ApiUnauthorizedResponse({
    description: "Authentication is required to access this resource.",
  })
  @UseGuards(AuthRequiredGuard)
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const post = await this.postService.create(req.user.id, createPostDto);
    return post;
  }

  @Patch(":id")
  @ApiOperation({ summary: "Partially update a post" })
  @ApiOkResponse({
    description: "OK.",
    type: PostEntity,
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
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    const updatedPost = await this.postService.updateById(id, updatePostDto);
    return updatedPost;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a post" })
  @ApiOkResponse({
    description: "OK.",
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    description: "Post cannot be found.",
  })
  async getPostById(@Param("id") id: string) {
    const post = await this.postService.getById(id);
    return post;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a post" })
  @ApiOkResponse({
    description: "OK.",
    type: PostEntity,
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
  async deletePost(@Param("id") id: string) {
    await this.postService.deleteById(id);
    return;
  }
}
