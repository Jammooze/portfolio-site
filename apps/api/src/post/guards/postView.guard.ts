import { Request } from "express";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { PostService } from "../post.service";

@Injectable()
export class PostViewGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const postId = req.params.postId;

    if (!postId) {
      throw new BadRequestException("Post id not provided.");
    }

    const post = await this.postService.getById(postId, ["user"]);

    if (!post.published) {
      throw new ForbiddenException(
        "You do not have permission to peform this action."
      );
    }

    if (req.isAuthenticated() && post.userId !== req.user.id) {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }

    return true;
  }
}
