import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";

@Injectable()
export class FollowInteractionService {
  constructor(private readonly userSerivce: UserService) {}

  async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new BadRequestException(
        "followerId and followingId cannot be the same."
      );
    }

    const followerUser = await this.userSerivce.getById(followerId);
    const followingUser = await this.userSerivce.getById(followerId, [
      "followedUsers",
    ]);

    const isAlreadyFollowing = followingUser.followedUsers.some(
      (user) => user.id === followerUser.id
    );

    if (!isAlreadyFollowing) {
      followingUser.followedUsers.push(followerUser);
    } else {
      followingUser.followingUsers = followingUser.followingUsers.filter(
        (user) => user.id !== followerUser.id
      );
    }

    const updatedUser = await followerUser.save();

    return {
      userId: updatedUser.id,
      followerCount: updatedUser.followedUsers,
    };
  }
}
