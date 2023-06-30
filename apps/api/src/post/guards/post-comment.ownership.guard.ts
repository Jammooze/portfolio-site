import { Request } from "express";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { PostCommentService } from "../comment/post-comment.service";

@Injectable()
export class PostCommentOwnership implements CanActivate {
  constructor(private readonly commentService: PostCommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.isAuthenticated()) {
      throw new UnauthorizedException(
        "Authentication is required to use the PostCommentOwnership guard."
      );
    }

    const userId = req.user.id;
    const postId = req.params.id;
    const commentId = req.params.commentId;

    const doesUserOwnComment = await this.commentService.doesUserOwnComment(
      postId,
      commentId,
      userId
    );

    if (!doesUserOwnComment) {
      throw new ForbiddenException(
        "You do not have permission to perform this action."
      );
    }

    return true;
  }
}
