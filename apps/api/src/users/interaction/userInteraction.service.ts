import { Injectable } from "@nestjs/common";
import { FollowInteractionService } from "src/interaction/followInteraction.service";
import { UserService } from "../user.service";

@Injectable()
export class UserInteractionService {
  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowInteractionService
  ) {}

  private async getFollowerAndFollowingUser(
    followerId: string,
    followingId: string
  ) {
    const follower = this.userService.getById(followerId);
    const following = this.userService.getById(followingId, [
      "followingUsers",
      "followedUsers",
    ]);

    return {
      follower: await follower,
      following: await following,
    };
  }

  async followUser(followerId: string, followingId: string) {
    const { follower, following } = await this.getFollowerAndFollowingUser(
      followerId,
      followingId
    );

    const followResult = await this.followService.followUser(
      follower,
      following
    );

    return followResult;
  }

  async unfollowUser(followerId: string, followingId: string) {
    const { follower, following } = await this.getFollowerAndFollowingUser(
      followerId,
      followingId
    );

    const followResult = await this.followService.unfollowUser(
      follower,
      following
    );

    return followResult;
  }
}
