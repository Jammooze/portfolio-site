import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { HeartInteractionService } from "src/interaction/heartInteraction.service";
import { PostService } from "../post.service";

@Injectable()
export class PostInteractionService {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly interactionService: HeartInteractionService
  ) {}

  async heartPost(postId: string, userId: string) {
    const user = this.userService.getById(userId);
    const post = this.postService.getById(postId, ["heartedUsers"]);

    const data = await this.interactionService.heartItem(
      await post,
      await user
    );

    return data;
  }
}
