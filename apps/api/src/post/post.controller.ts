import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/create-post.dto";
import { AuthRequiredGuard } from "../auth/guards/auth-required.guard";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("create")
  @UseGuards(AuthRequiredGuard)
  async createPost(@Req() req: Request, @Body() body: CreatePostDto) {
    const post = await this.postService.create(body, req.user.id);
    return post;
  }
}
