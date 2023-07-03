import { Injectable } from "@nestjs/common";
import { FollowInteractionService } from "src/interaction/followInteraction.service";
import { UserService } from "../user.service";

@Injectable()
export class UserInteractionService {
  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowInteractionService
  ) {}

  async followUser(followerId: string, followingId: string) {
    const follower = this.userService.getById(followerId);
    const following = this.userService.getById(followingId, [
      "followingUsers",
      "followedUsers",
    ]);

    const followResult = await this.followService.followUser(
      await follower,
      await following
    );

    return followResult;
  }
}
