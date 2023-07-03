import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "src/users/user.entity";

@Injectable()
export class FollowInteractionService {
  private checkFollowingUserEntity(user: User) {
    if (!("followingUsers" in user)) {
      throw new InternalServerErrorException(
        "followingUsers field is missing in the following user entity."
      );
    }

    if (!("followedUsers" in user)) {
      throw new InternalServerErrorException(
        "followedUsers field is missing in the following user entity."
      );
    }
  }

  async followUser(follower: User, following: User) {
    this.checkFollowingUserEntity(following);

    const isAlreadyFollowing = following.followedUsers.some(
      (user) => user.id === follower.id
    );

    if (isAlreadyFollowing) {
      throw new BadRequestException("You are already following this user.");
    }

    following.followedUsers.push(follower);
    const updatedUser = await following.save();

    return {
      followerCount: updatedUser.followedUsers.length,
    };
  }

  async unfollowUser(follower: User, following: User) {
    this.checkFollowingUserEntity(following);

    const isCurrentlyFollowing = following.followedUsers.some(
      (user) => user.id === follower.id
    );

    if (!isCurrentlyFollowing) {
      throw new BadRequestException(
        "You are not currently following this user."
      );
    }

    following.followedUsers = following.followedUsers.filter(
      (user) => user.id !== follower.id
    );

    const updatedUser = await following.save();

    return {
      followerCount: updatedUser.followedUsers.length,
    };
  }
}
