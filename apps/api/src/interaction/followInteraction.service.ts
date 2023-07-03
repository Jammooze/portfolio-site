import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/users/user.entity";

@Injectable()
export class FollowInteractionService {
  async followUser(follower: User, following: User) {
    if (!("followingUser" in following)) {
      throw new InternalServerErrorException(
        "followingUser field is missing in the following user entity."
      );
    }

    const isAlreadyFollowing = following.followedUsers.some(
      (user) => user.id === follower.id
    );

    if (!isAlreadyFollowing) {
      following.followedUsers.push(follower);
    } else {
      following.followingUsers = follower.followingUsers.filter(
        (user) => user.id !== follower.id
      );
    }

    const updatedUser = await following.save();

    return {
      userId: updatedUser.id,
      followerCount: updatedUser.followedUsers,
    };
  }
}
