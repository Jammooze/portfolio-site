import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  Delete,
  HttpCode,
  Param,
  Get,
  Patch,
  ForbiddenException,
} from "@nestjs/common";
import { Request } from "express";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";
import { AuthGuard } from "@nestjs/passport";
import { UpdatePostDto } from "./dtos/update-post.dto";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthRequiredGuard)
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const post = await this.postService.create(req.user.id, createPostDto);
    return post;
  }

  @Patch(":id")
  async updatePost(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    const post = await this.postService.getById(id);

    if (post.userId !== req.user.id) {
      throw new ForbiddenException(
        "You are not authorized to update this post."
      );
    }

    const updatedPost = await this.postService.updateById(id, updatePostDto);
    return updatedPost;
  }

  @Get(":id")
  async getPostById(@Param("id") id: string) {
    const post = await this.postService.getById(id);
    return post;
  }

  @Delete(":id")
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async deletePost(@Param("id") id: string) {
    await this.postService.deleteById(id);
    return;
  }
}
