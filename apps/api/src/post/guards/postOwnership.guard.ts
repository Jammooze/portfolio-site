import { Request } from "express";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { PostService } from "../post.service";

@Injectable()
export class PostOwnershipGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.isAuthenticated()) {
      throw new UnauthorizedException(
        "Authentication is required to use the PostOwnershipGuard guard."
      );
    }

    const postId = req.params.id;
    const doesUserOwnPost = await this.postService.doesUserOwnPost(
      req.user.id,
      postId
    );

    if (!doesUserOwnPost) {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }

    return true;
  }
}
