import { Injectable, NotFoundException } from "@nestjs/common";
import {
  InteractionService,
  HeartItemType,
} from "src/interaction/interaction.service";
import { PostService } from "src/post/post.service";

@Injectable()
export class PostCommentInteractionService {
  constructor(
    private readonly postService: PostService,
    private readonly interactionService: InteractionService
  ) {}

  async heartComment(postId: string, commentId: string, userId: string) {
    const doesPostExist = await this.postService.doesPostExistById(postId);

    if (!doesPostExist) {
      throw new NotFoundException(`Post with ID: ${postId} not found.`);
    }

    const data = await this.interactionService.heartItem(
      commentId,
      HeartItemType.Comment,
      userId
    );

    return data;
  }
}
