import { Injectable, NotFoundException } from "@nestjs/common";
import {
  HeartInteractionService,
  HeartItemType,
} from "src/interaction/heartInteraction.service";
import { PostService } from "src/post/post.service";

@Injectable()
export class PostCommentInteractionService {
  constructor(
    private readonly postService: PostService,
    private readonly heartInteractionService: HeartInteractionService
  ) {}

  async heartComment(postId: string, commentId: string, userId: string) {
    const doesPostExist = await this.postService.doesPostExistById(postId);

    if (!doesPostExist) {
      throw new NotFoundException(`Post with ID: ${postId} not found.`);
    }

    const data = await this.heartInteractionService.heartItem(
      commentId,
      HeartItemType.Comment,
      userId
    );

    return data;
  }
}
