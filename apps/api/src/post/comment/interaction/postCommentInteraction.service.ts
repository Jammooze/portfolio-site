import { Injectable } from "@nestjs/common";
import { HeartInteractionService } from "src/interaction/heartInteraction.service";
import { UserService } from "src/users/user.service";
import { PostCommentService } from "../postComment.service";

@Injectable()
export class PostCommentInteractionService {
  constructor(
    private readonly commentService: PostCommentService,
    private readonly userService: UserService,
    private readonly interactionService: HeartInteractionService
  ) {}

  private async getUserAndCommentById(
    postId: string,
    commentId: string,
    userId: string
  ) {
    const comment = this.commentService.getByPostAndCommentId(
      postId,
      commentId,
      ["heartedUsers"]
    );
    const user = this.userService.getById(userId);
    return { comment, user };
  }

  async heartComment(postId: string, commentId: string, userId: string) {
    const { comment, user } = await this.getUserAndCommentById(
      postId,
      commentId,
      userId
    );

    const data = await this.interactionService.heartItem(
      await comment,
      await user
    );
    return data;
  }

  async unheartComment(postId: string, commentId: string, userId: string) {
    const { comment, user } = await this.getUserAndCommentById(
      postId,
      commentId,
      userId
    );

    const data = await this.interactionService.unheartItem(
      await comment,
      await user
    );
    return data;
  }
}
