import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostCommentService, CommentData } from "../post-comment.service";

@Injectable()
export class PostCommentReplyService {
  constructor(private readonly commentService: PostCommentService) {}

  async create(commentData: CommentData) {
    const commentHasParent = await this.commentService.hasCommentParent(
      commentData.postId,
      commentData.parentId
    );

    if (commentHasParent) {
      throw new ForbiddenException(
        "Cannot reply to a comment that already has a parent."
      );
    }

    const comment = await this.commentService.create(commentData);
    return comment;
  }
}
