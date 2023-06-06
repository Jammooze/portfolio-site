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
} from "@nestjs/common";
import { Request } from "express";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthRequiredGuard)
  async createPost(@Req() req: Request, @Body() body: CreatePostDto) {
    const post = await this.postService.create(body, req.user.id);
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
