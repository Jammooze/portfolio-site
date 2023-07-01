import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { HeartCommentResponse } from "src/post/dtos/comment";
import { PostCommentService } from "../postComment.service";

@Injectable()
export class PostCommentInteractionService {
  constructor(
    // @InjectRepository(PostComment)
    // private readonly commentRepository: Repository<PostComment>,
    private readonly userService: UserService,
    private readonly commentService: PostCommentService
  ) {}

  private async getCommentWithHeartedUsersById(
    postId: string,
    commentId: string
  ) {
    const comment = await this.commentService.getById(postId, commentId, [
      "heartedUsers",
    ]);
    return comment;
  }

  async heartComment(
    postId: string,
    commentId: string,
    userId: string
  ): Promise<HeartCommentResponse> {
    const user = await this.userService.getById(userId);
    const comment = await this.getCommentWithHeartedUsersById(
      postId,
      commentId
    );

    const isUserHearted = comment.heartedUsers.find(
      (heartedUser) => heartedUser.id === userId
    );

    if (!isUserHearted) {
      comment.heartedUsers.push(user);
    } else {
      comment.heartedUsers = comment.heartedUsers.filter(
        (heartedUser) => heartedUser.id !== userId
      );
    }

    const updatedComment = await comment.save();

    return {
      heartCount: updatedComment.heartedUsers.length,
      isUserHearted: !isUserHearted,
    };
  }
}
